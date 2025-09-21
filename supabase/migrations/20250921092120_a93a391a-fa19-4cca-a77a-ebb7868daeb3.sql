-- Update the profiles table to ensure proper role validation
-- First, update any existing roles to match the new naming convention
UPDATE profiles SET role = 'shop_owner' WHERE role = 'property_owner';
UPDATE profiles SET role = 'government_official' WHERE role = 'admin';

-- Create a constraint to ensure only valid roles are allowed
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('customer', 'shop_owner', 'government_official'));

-- Update the handle_new_user function to handle the new role names
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    NEW.raw_user_meta_data ->> 'phone',
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'customer')
  );
  RETURN NEW;
END;
$$;