import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@plaquinhaflex.com',
    name: 'Admin PlaquinhaFlex',
    role: 'admin'
  },
  {
    id: '2',
    email: 'cliente@teste.com',
    name: 'Cliente Teste',
    role: 'client'
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock validation - in real app this would be API call
    if (password === '123456') {
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};