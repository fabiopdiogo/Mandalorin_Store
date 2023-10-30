import { createContext } from 'react';
import {User} from '../../types/User';
import React from 'react';

export type AuthContextType = {
  user: User | null;
  signin: (email: string, password: string) => Promise<any>;
  signout: () => void;
  getProducts: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>(null!);