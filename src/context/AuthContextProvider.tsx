'use client'
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import React from 'react';

interface IAuthContext {
  isAuthenticated: boolean;
  username: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  username: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = jwtDecode(token) as { username: string; role: string };
      setIsAuthenticated(true);
      setUsername(decodedToken.username);
      setRole(decodedToken.role);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('accessToken', token);
    const decodedToken = jwtDecode(token) as { username: string; role: string };
    setIsAuthenticated(true);
    setUsername(decodedToken.username);
    setRole(decodedToken.role);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
