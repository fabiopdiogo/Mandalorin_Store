import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Equipment } from '../../../types/Equipment';
import { CartContext } from '../../contexts/Cart/CartContext';

interface Props {
  product_id: string;
  //id_user: string;
  //quantity: number;
}

function ProdCart({product_id}: Props) {
  const {
    cartState: {equipments},
    cartDispatch
  } = useContext(CartContext);
  
   function findOneById(id: string) {
    return equipments.find((product: { id: string; }) => product.id === id);
  }
  
  const { name, image, price } = findOneById(product_id) || {};

  const RemoveProd = () => {
    cartDispatch({ type: 'REMOVE_FROM_CART', payload: product_id });
  };

  const handleQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const intValue = parseInt(event.target.value, 10);
    cartDispatch({ type: 'UPDATE_CART_QTY', payload: { product_id, quantity: intValue } });
  };
  
  const handlePrice = () => {    
    if (price) {
      //return price * quantity;
    }    
    return 0;
  };
  
  return (
    <CartItemContainer>
      <ProductImage src={image} alt={name} />
      <ProductDetails>
        <ProductName>{name}</ProductName>
        <ProductPrice>${handlePrice()}</ProductPrice>
      </ProductDetails>
      <ProductQuantity value={0} onChange={handleQuantity}>
        {[1, 2, 3, 4, 5].map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </ProductQuantity>
      <Remove src="bin.png" alt="Remove" onClick={RemoveProd} />
    </CartItemContainer>
  );
}

export default ProdCart;

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;

  @media (max-width: 350px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 350px) {
    align-items: center;
  }
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const ProductQuantity = styled.select`
  padding: 10px;
  border-color: grey;
  margin-bottom: 5px;
`;

const Remove = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;

  @media (max-width: 350px) {
    margin-top: 10px;
  }
`;
