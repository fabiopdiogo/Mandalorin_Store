// src/context/CartContext.tsx
import React, { createContext, useReducer, Dispatch, useState, useEffect } from 'react';
import axios from 'axios';
import {baseURL} from '../../utils/constant'
import { CartContext } from './CartContext';
import { cartReducer } from './reducer';
import { Equipment } from '../../../types/Equipment';

export const CartProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<Equipment[]>([]);
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    equipments: data,
    cartItems: [],
  });

  useEffect(() => {
    cartDispatch({ type: 'POPULATE_EQUIPMENTS', payload: data });
  }, []); 
  
  useEffect(() => {
    const listEquipments = async () => {
      const response = await axios.get(`${baseURL}/equipments`);
      console.log(response)
      setData(response.data);
    };
    listEquipments();
  }, []); 

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};


