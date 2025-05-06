import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#673ab7', marginBottom: 2 }}>
      <Toolbar>
        <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
