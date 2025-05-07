import React from 'react';
import { Card, CardContent, Box, Skeleton } from '@mui/material';

const AnimeCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: '225px' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image skeleton with 2:3 aspect ratio */}
      <Box sx={{
        position: 'relative',
        paddingTop: '150%', // 2:3 aspect ratio (3/2 * 100%)
        width: '100%'
      }}>
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          animation="wave"
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Title skeleton */}
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
        
        {/* Type and score skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Skeleton variant="text" width="40%" height={20} animation="wave" />
          <Skeleton variant="text" width="20%" height={20} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCardSkeleton;
