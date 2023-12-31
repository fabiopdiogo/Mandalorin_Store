import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

import {baseURL} from '../src/utils/constant'
import { Equipment } from '../types/Equipment'
import ProdCart from '../src/components/ProdCart/ProdCart';
import { AuthContext } from '../src/contexts/Auth/AuthContext';
import { CartContext } from '../src/contexts/Cart/CartContext';
import { Cart } from '../types/Cart';
import { equipments } from '../src/equipments/equipments';


function Carrinho() {
  let total = '';
  const auth = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!auth.user) {
      // Redirecione para a página de login se o usuário não estiver autenticado
      router.push('/login');
    }
  }, [auth.user]);

  const { cartDispatch } = useContext(CartContext);
  const {
    cartState: {cartItems},
  } = useContext(CartContext);

  const isCartEmpty = cartItems.length === 0;
  
  const clearCartAndNavigate = async () => {      

    if (cartDispatch) {
      cartDispatch({ type: 'CLEAR_CART' });
    }    

    const requestData = {
      cartItems: cartItems, // Substitua pelo seu array de items no carrinho
      productQuantities: productQuantities, // Substitua pela sua variável de quantidades
    };
    
    const response  = await axios.post(`${baseURL}/pedido/${auth.user?._id}`, requestData)
      .then((response) => {
        if (response.data.pedido) {
          const pedidoString = JSON.stringify(response.data.pedido, null, 2); // A função JSON.stringify() converte o objeto em uma string formatada
          window.alert(pedidoString);
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
      
      window.alert("Pedido realizado com sucesso!");
      console.log(response)
  };

  const [productQuantities, setProductQuantities] = useState<{ [productId: string]: number }>({});
  
  useEffect(() => {
    const quantities = cartItems.reduce((acc, product) => {
      acc[product.id] = product.quantity;
      return acc;
    }, {});
    setProductQuantities(quantities);
  }, [setProductQuantities]);

 
  return (
    <Div>
      <Header>
        <h1>Mangalorian Store</h1>
        <Link href="/">Voltar</Link>
      </Header>
      <Main>
        <Products>
          <SpanCarrinho>
            <h1>Carrinho</h1>
            <span>{cartItems.length} items</span>
          </SpanCarrinho>
          {cartItems.length > 0 ? (
            cartItems.map((prod: Equipment) => (
              <ProdCart
                key={prod.id}  // Assuming each product has a unique ID for the key
                product_id={prod.id}
                quantity={productQuantities[prod.id] || 1}
                setProductQuantities={setProductQuantities}
              />
            ))
          ) : (
            <CenteredP>O carrinho está vazio.</CenteredP>
          )}
        </Products>
        <Summary>
          <h2>Resumo</h2>
          <span>Total: ${cartItems.reduce((total, product) => {
            const productPrice = product.price;
            const quantity = productQuantities[product.id] || 1;
            if (productPrice && quantity) {
              return total + productPrice * quantity;
            }
            return total;
          }, 0)}</span>
          <Link href="/"><Button1 onClick={clearCartAndNavigate} disabled={isCartEmpty}>Confirmar</Button1></Link>
        </Summary>
      </Main>
      <Link href="/"><Button2 onClick={clearCartAndNavigate} disabled={isCartEmpty}>Confirmar</Button2></Link>

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

const CenteredP = styled.p`
  text-align: center;
  margin-top: 50px; /* Adjust the margin as needed for vertical positioning */
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

