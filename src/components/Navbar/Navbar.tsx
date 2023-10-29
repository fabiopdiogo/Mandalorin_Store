import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import styles from "./Navbar.module.css";
//import { Link } from 'react-router-dom';
import Link from 'next/link';
import Filter from '../Filter/Filter'
import { CartContext } from '../../contexts/CartContext';
import { Equipment } from '../../../types/Equipment';

interface Props {
  setEquipmentFiltered: (filteredData: any[]) => void;
}

const Navbar = ({setEquipmentFiltered}: Props) => {
  const {
    cartState: {equipments}
  } = useContext(CartContext);

  const [filteredData, setFilteredData] = useState(equipments);

  useEffect(() => {
    console.log(filteredData)
  },[filteredData])

  const handleFilterChange = (filter) => {
    // Aqui você deve processar os filtros e atualizar os dados filtrados
    // Neste exemplo, estamos apenas imprimindo os filtros no console
    console.log('Filtros:', filter);
  
    let equipmentFiltered = equipments.filter((e) => (
      e.name.toLowerCase().includes(filter.search.toLowerCase())
    ));
    
    if(filter.minRating!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      parseFloat(e.rating) >= parseFloat(filter.minRating)
      );
    }

    if(filter.maxRating!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      parseFloat(e.rating) <= parseFloat(filter.maxRating)
      );
    }

    if(filter.minPrice!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      parseFloat(e.price) >= parseFloat(filter.minPrice)
      );
    }

    if(filter.maxPrice!=''){
      equipmentFiltered = equipmentFiltered.filter((e) =>
      parseFloat(e.price) <= parseFloat(filter.maxPrice)
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
      equipmentFiltered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    let sortOrder = parseFloat(filter.sort);
    if (sortOrder === 1) {
      equipmentFiltered.reverse(); // Reverta a ordem se sortOrder for igual a 1 (descrescente)
    }
    //setFilteredData(equipmentFiltered)
    setEquipmentFiltered(equipmentFiltered);
  };
  
  return (
    <>      
      <header className={styles.header}>        
        <Filter onFilterChange={handleFilterChange} setEquipmentFiltered={setEquipmentFiltered}/>
        <div className={styles.icons}>
          <div className={styles.icon}>            
              <Link href="/carrinho"><img src="icons/carrinho.png" alt="Carrinho de compras" /></Link>            
          </div>       
        </div>
      </header>
    </>
  )
}

export default Navbar;