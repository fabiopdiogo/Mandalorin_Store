import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../inputs/Input';
import {equipments}  from '../../equipments/equipments';


interface Filter {
  search: string;
  minRating: string;
  maxRating: string;
  minPrice: string;
  maxPrice: string;
  isAvailable: boolean;
  orderBy: string;
  sort: string;
}

interface FilterBarProps {
  onFilterChange?: (filter: Filter) => void;
  setEquipmentFiltered?: (filteredData: any[]) => void;
}


const FilterBar: React.FC <FilterBarProps> = ({setEquipmentFiltered, onFilterChange}) => {
  
  const [filter, setFilter] = useState<Filter>({
    search: '',
    minRating: '',
    maxRating: '',
    minPrice: '',
    maxPrice: '',
    isAvailable: true,
    orderBy: 'default',
    sort: 'asc',
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setFilter({
      ...filter,
      [name]: newValue,
    });
  };

  const handleFilterClick = () => {
    onFilterChange(filter);
  };
  
  const handleClearFilters = () => {
    setFilter({
      search: '',
      minRating: '',
      maxRating: '',
      minPrice: '',
      maxPrice: '',
      isAvailable: true,
      orderBy: 'default',
      sort: 'asc',
    });
    setEquipmentFiltered(equipments)
  };

  return (
    <FilterBarContainer>
      <FilterInput type="text" name="search" placeholder="Search" value={filter.search} onChange={handleInputChange}        
      />

      <FilterInput type="number" name="minRating"    placeholder="Min Rating"
        value={filter.minRating}
        onChange={handleInputChange}
      />

      <FilterInput
        type="number" name="maxRating"placeholder="Max Rating"value={filter.maxRating}onChange={handleInputChange}
      />

      <FilterInput type="number" name="minPrice" placeholder="Min Price" value={filter.minPrice} onChange={handleInputChange}
      />

      <FilterInput
        type="number" name="maxPrice" placeholder="Max Price" value={filter.maxPrice} onChange={handleInputChange}
      />

      <FilterCheckbox>
        <input type="checkbox" name="isAvailable" checked={filter.isAvailable} onChange={handleInputChange}
        />
        Available
      </FilterCheckbox>

      <FilterSelect name="orderBy" onChange={handleInputChange}>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="price">Price</option>
      </FilterSelect>

      <FilterSelect name="sort" onChange={handleInputChange}>
        <option value={0}>Crescente</option>
        <option value={1}>Decrescente</option>
      </FilterSelect>
      <Buttons>
        <Button onClick={handleFilterClick}>Filtrar</Button>
        <ClearButton onClick={handleClearFilters}>Limpar</ClearButton>
      </Buttons>
      
    </FilterBarContainer>
  );
};

export default FilterBar;


const FilterBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const FilterInput = styled.input`
  padding: 5px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  border: 1px solid #99c1eb;
  ::placeholder {
    color: white;
  }
  flex: 1; /* Faz com que o input cresça para preencher o espaço disponível */
`;

const FilterSelect = styled.select`
  padding: 5px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: #6c757d;
  color: white;
  border: 1px solid #99c1eb;
`;

const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  background-color: #7516b4;
  color: white;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%; /* Faz com que o botão ocupe toda a largura disponível */
`;

const ClearButton = styled(Button)`
  background-color: #7516b4;
  border: 1px solid black;
`;

