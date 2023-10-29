import React, { useContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Equipment } from '../../../types/Equipment';
import { CartContext } from '../../contexts/CartContext';

const theme = {
  primaryColor: '#99c1eb', // Exemplo de cor primária
  secondaryColor: '#6c757d', // Exemplo de cor secundária
  // Adicione outras cores e estilos conforme necessário
};

interface Props {
  equipment: Equipment;
}



function Card({ equipment }: Props) {
  const {
    cartState: {cartItems},
    cartDispatch
  } = useContext(CartContext);
  return (
    <ThemeProvider theme={theme}>
      <CardContainer key={equipment.id}>
        <Image src={equipment.image} alt={equipment.name} />
        <p>Name: {equipment.name}</p>
        <p>Description: {equipment.description}</p>
        <p>Price: {equipment.price}</p>
        <p>Is Available: {equipment.isAvailable ? 'Yes' : 'No'}</p>
        <p>Rating: {equipment.rating}</p>
        {cartItems.some((e: { id: string }) => e.id === equipment.id) ? (
        <ButtonRemove
          onClick={() =>
            cartDispatch({
              type: 'REMOVE_FROM_CART',
              payload: equipment.id // Use prod._id como payload
            })
          }
        >
          Remover do Carrinho
        </ButtonRemove>
      ) : (
        <ButtonAdd
          onClick={() => {
            cartDispatch({
              type: 'ADD_TO_CART',
              payload: equipment// Use prod._id como payload
            })
          }}         
        >
          "Adicionar ao carrinho" 
        </ButtonAdd>
      )}
      </CardContainer>
    </ThemeProvider>
  );
}

export default Card;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start ;
  align-items: flex-start;
  gap: 15px;
  background-color: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.primaryColor};
  padding: 10px;
  border: 1px solid ${props => props.theme.primaryColor};
  margin: 10px;
  width: 200px;
  height: 450px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 2%;
  padding: 2% 5%;
  border-radius: 10px;
  border: 0;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out; /* Adicionando a transição */

  &:hover {
    background-color: ${(props) => (props.disabled ? props.theme.disabled : 'blue')};
  }

  &:disabled {
    background-color: ${(props) => props.theme.disabled};
  }
`;

const ButtonAdd = styled(Button)`
  background-color: lightblue;
`;

const ButtonRemove = styled(Button)`
  background-color: red;
`;