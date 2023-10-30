import { createContext, Dispatch } from 'react';

export type CartContextType ={
  cartState: any;
  cartDispatch: Dispatch<any>;
};

export const CartContext = createContext<CartContextType>(null!);