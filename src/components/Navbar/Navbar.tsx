import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from "./Navbar.module.css";

import Link from 'next/link';
import Filter from '../Filter/Filter'
import { CartContext } from '../../contexts/Cart/CartContext';
import { Equipment } from '../../../types/Equipment';
import { equipments } from '../../equipments/equipments';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useRouter } from 'next/router';

interface Props {
  setEquipmentFiltered: (filteredData: Equipment[]) => void;
}

const Navbar = ({setEquipmentFiltered}: Props) => {
  
  const auth = useContext(AuthContext);
  const router = useRouter();
  
  const {
    cartDispatch
  } = useContext(CartContext);
  const [filteredData, setFilteredData] = useState(equipments);

  const handleFilterChange = (filter) => {
    console.log('Filtros:', filter);
  
    let equipmentFiltered = equipments.filter((e) => (
      e.name.toLowerCase().includes(filter.search.toLowerCase())
    ));
    
    if(filter.minRating!=''){
      equipmentFiltered = equipmentFiltered.filter((e : Equipment) =>
      e.rating >= parseFloat(filter.minRating)
      );
    }

    if(filter.maxRating!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      e.rating <= parseFloat(filter.maxRating)
      );
    }

    if(filter.minPrice!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      e.price >= parseFloat(filter.minPrice)
      );
    }

    if(filter.maxPrice!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      e.price <= parseFloat(filter.maxPrice)
      );
    }
    
    equipmentFiltered = equipmentFiltered.filter((e) =>
    e.isAvailable === filter.isAvailable 
    );
    
    

    //let orderByMatch = [...equipments];
    if (filter.orderBy === "name") {
      equipmentFiltered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter.orderBy === "rating") {
      equipmentFiltered.sort((a, b) => b.rating - a.rating);
    } else if (filter.orderBy === "price") {
      equipmentFiltered.sort((a, b) => a.price - b.price);
    }

    let sortOrder = parseFloat(filter.sort);
    if (sortOrder === 1) {
      equipmentFiltered.reverse(); 
    }
   
    setFilteredData(equipmentFiltered)
    setEquipmentFiltered(equipmentFiltered);
  };
  const handleLogout = async () => {    
    cartDispatch({ type: 'CLEAR_CART'});
    await auth.signout();    
    router.push('/login')
  }  
  const handleLogin =  () => {
    router.push('/login')
  }  
  return (
    <>      
      <header className={styles.header}>             
        <div className={styles.header2}>          
          <h1>MANDALORIAN STORE</h1> 
          <Div>            
              <Image src="icons/carrinho.png" alt="Carrinho de compras" onClick={() => router.push('/carrinho')} /> 
              {auth.user ? (
                <Link href="/">
                  <Button onClick={handleLogout}>Sair</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button onClick={handleLogin}>Fazer Login</Button>
                </Link>)}
    
          </Div>             
        </div>

        <Filter onFilterChange={handleFilterChange} setEquipmentFiltered={setEquipmentFiltered}/>    
      </header>
    </>
  )
}

export default Navbar;

const Button = styled.button`
  background-color: #7516b4; 
  color: white; 
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;
const Image = styled.img`
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  gap: 5px;
`;