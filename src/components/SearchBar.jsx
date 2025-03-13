import React, { useState, useContext } from 'react';
import { TextField } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';

const SearchBar = ({ onSearch }) => {
  const { darkMode } = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search tasks..."
      value={query}
      onChange={handleChange}
      style={{
        marginBottom: '20px',
        background: darkMode ? '#333' : '#ffffff', // ✅ Dark background in dark mode
        borderRadius: '8px',
      }}
      InputProps={{
        style: {
          color: darkMode ? '#ffffff' : '#000000', // ✅ White text in dark mode
        },
      }}
    />
  );
};

export default SearchBar;
