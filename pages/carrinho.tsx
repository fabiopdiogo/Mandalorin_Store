import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../src/contexts/Cart/CartContext';
import ProdCart from '../src/components/ProdCart/ProdCart';
import {withIronSessionSsr}  from "iron-session/next"

import {ironConfig} from '../lib/middlewares/ironSession';


function Carrinho() {  
  const {
    cartState: {cartItems}
  } = useContext(CartContext);
  console.log(cartItems)
  return (
    <Div>
      {cartItems.map((item) => (
        <ProdCart product_id={item.id} />
      )
      )}
    </Div>
  );
}

export default Carrinho;


const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0px 20px;
  gap:10px;
`;

const SpanCarrinho = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30vh;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const Products = styled.div`
  width: 70%;
  flex-direction: column;
  box-sizing: border-box;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Summary = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #353853;
  color: white;
  padding:10px 5px;
  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const Button1 = styled.button`
  background-color: blue;
  width: 100%;
  margin-top: 10px;
  padding: 5px 20px; 
  border-radius: 10px;
  border: 0;
  font-weight: bold;
  color: ${props => props.theme.white};
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 800px) {
    display: none;
  }
  ${props => props.disabled && 'cursor: pointer;'}

  :hover {
    background-color: ${props => props.theme.primaryHover};
  }

  :disabled {
    /* Define styles for the disabled state. You can use the same styles as for the "not-allowed" cursor and gray background. */
    cursor: not-allowed;
    background-color: gray;
  }
`
const Button2 = styled.button`
  display: none;
  background-color: blue;
  margin: 10px 0;
  width: 100%;
  padding: 10px 20px; 
  border-radius: 10px;
  border: 0;
  font-weight: bold;
  color: ${props => props.theme.white};
  font-size: 16px;
  cursor: pointer;
  @media (max-width: 800px) {
    display: block;
  }

  ${props => props.disabled && 'cursor: pointer;'}

  :hover {
    background-color: ${props => props.theme.primaryHover};
  }

  :disabled {
    /* Define styles for the disabled state. You can use the same styles as for the "not-allowed" cursor and gray background. */
    cursor: not-allowed;
    background-color: gray;
  }
`

