import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorStateProps {
  error: Error | unknown;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'An unexpected error occurred';

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px',
        gap: 2,
        p: 3,
        textAlign: 'center'
      }}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 48 }} />
      <Typography variant="h6" color="error">
        Something went wrong
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {errorMessage}
      </Typography>
      {onRetry && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
