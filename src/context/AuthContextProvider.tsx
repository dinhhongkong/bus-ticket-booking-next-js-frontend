'use client'
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import React from 'react';
import { User } from '@/types/models/Auth';
import Cookies from 'js-cookie';
interface IAuthContext {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);



  useEffect(() => {
    const token = Cookies.get('accessToken');
    // const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken : User = jwtDecode(token) ;
      if (decodedToken.exp < Date.now() / 1000) {
        setIsAuthenticated(false);
        Cookies.remove('accessToken');
        return
      }
      setIsAuthenticated(true);
      setUser(decodedToken);
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('accessToken', token)
    // localStorage.setItem('accessToken', token);
    const decodedToken : User = jwtDecode(token);
    setIsAuthenticated(true);
    setUser(decodedToken);
  };

  const logout = () => {
    Cookies.remove('accessToken');
    // localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
