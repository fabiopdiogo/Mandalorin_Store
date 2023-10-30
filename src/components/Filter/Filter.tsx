import React, { useState } from 'react';
import styled from 'styled-components';
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
      <FilterInput
        type="text"
        name="search"
        placeholder="Search"
        value={filter.search}
        onChange={handleInputChange}        
      />

      <FilterInput
        type="number"
        name="minRating"
        placeholder="Min Rating"
        value={filter.minRating}
        onChange={handleInputChange}
      />

      <FilterInput
        type="number"
        name="maxRating"
        placeholder="Max Rating"
        value={filter.maxRating}
        onChange={handleInputChange}
      />

      <FilterInput
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={filter.minPrice}
        onChange={handleInputChange}
      />

      <FilterInput
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={filter.maxPrice}
        onChange={handleInputChange}
      />

      <FilterCheckbox>
        <input
          type="checkbox"
          name="isAvailable"          
          checked={filter.isAvailable}
          onChange={handleInputChange}
        />
        Available
      </FilterCheckbox>

      <FilterSelect name="orderBy" onChange={handleInputChange}>
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="rating">Rating</option>
        <option value="price">Price</option>
      </FilterSelect>

      <FilterSelect name="sort" onChange={handleInputChange}>
        <option value={0}>Crescente</option>
        <option value={1}>Decrescente</option>
      </FilterSelect>

      <button onClick={handleFilterClick}>Filter</button>
      <button onClick={handleClearFilters}>Clear Filters</button>
    </FilterBarContainer>
  );
};

export default FilterBar;


const FilterBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const FilterInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;