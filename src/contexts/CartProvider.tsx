// src/context/CartContext.tsx
import React, { createContext, useReducer, Dispatch, useState, useEffect } from 'react';
import axios from 'axios';

import { CartContext } from './CartContext';
import { cartReducer } from './reducer';
import { Equipment } from '../../types/Equipment';

export const CartProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Equipment[]>([]);

  const [cartState, cartDispatch] = useReducer(cartReducer,{
     equipments: data,
     cartItems: [] 
  });
  useEffect(() => {
    cartDispatch({ type: 'POPULATE_EQUIPMENTS', payload: data });
    //console.log(cartState)
  }, [cartState]);

  useEffect(() =>{
    console.log(cartState)
  },[cartState.cartItems])
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/equipments');      
      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  }
  useEffect(() => {
    fetchData();     
  }, []);
  
  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};


