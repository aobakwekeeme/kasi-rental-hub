import { useState } from 'react';
import AuthModal from '../components/AuthModal';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <AuthModal
        isOpen={true}
        onClose={() => window.history.back()}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}