import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components'

import { Equipment } from '../types/Equipment';
import Card from '../src/components/Card/Card';
import Navbar from '../src/components/Navbar/Navbar';
import { CartContext } from '../src/contexts/Cart/CartContext';
import { equipments } from '../src/equipments/equipments';
const IndexPage = () => {
  const {
    cartState 
  } = useContext(CartContext);

  const [equipmentFiltered,setEquipmentFiltered] = useState<any[]>(equipments);
   
  
  useEffect(() => {
    //setEquipmentFiltered(equipments)
    console.log(equipmentFiltered) 
  },[equipmentFiltered])

  return ( 
    <Main>
      <Navbar setEquipmentFiltered={setEquipmentFiltered} />
       <ItemsSection>
       {equipmentFiltered.length > 0 && (
            <>
              {
                equipmentFiltered.map((equipment: Equipment) => (
                  <Card equipment={equipment} />
                ))
              }
            </>
         )}
       </ItemsSection>
    </Main>
  );
}

export default IndexPage;

const ItemsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap:90px;
  width: 90%;
  justify-content: center;
  align-items:center;
  flex-wrap: wrap;
`
const Main = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`