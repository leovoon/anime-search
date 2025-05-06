import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingAnimationProps {
  message?: string;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        gap: 2
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingAnimation;
