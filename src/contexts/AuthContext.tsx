import { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'shop-owner' | 'government' | 'customer';
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

// Initialize context without a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

// Hardcoded users for demonstration
const DEMO_USERS = [
  {
    id: '1',
    email: 'mokoena@gmail.com',
    password: 'Mokoena2025',
    name: 'Billy Mokoena',
    role: 'shop-owner' as const
  },
  {
    id: '2',
    email: 'masia@gmail.com',
    password: 'Masia2025',
    name: 'Tshimangadzo Masia',
    role: 'government' as const
  },
  {
    id: '3',
    email: 'kamba@gmail.com',
    password: 'Kamba2025',
    name: 'Khanyisa Kamba',
    role: 'customer' as const
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string): boolean => {
    // Look for matching user in demo list
    const foundUser = DEMO_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Set authenticated user (excluding password)
      setUser({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      });
      return true;
    }

    return false;
  };

  const signOut = () => {
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}