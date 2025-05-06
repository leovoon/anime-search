import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search for anime...' 
}) => {
  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
          },
        }}
      />
    </Box>
  );
};

export default SearchBar;
