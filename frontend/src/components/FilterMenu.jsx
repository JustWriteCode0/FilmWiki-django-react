import { React, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../styles/FilterMenu.css'


const FilterMenu = ({ SelectData }) => {
    const [select, setSelect] = useState('')

    const handleChange = (event) => {
        setSelect(event.target.value)
        SelectData(event.target.value)
      };
    
      return (
        <Box className="filter-films-container">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={select}
              label={"Filter"}
              onChange={handleChange}
            >
              <MenuItem className="filter-item" value={'Best'}>Filter By Best Rating</MenuItem>
              <MenuItem className="filter-item" value={'New'}>Filter By New</MenuItem>
              <MenuItem className="filter-item" value={'ByName'}>Filter By Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      );
}

export default FilterMenu