import React from 'react';
import { Box, Skeleton } from '@mui/material';
import AnimeCardSkeleton from './AnimeCardSkeleton';

interface AnimeGridSkeletonProps {
  count?: number;
  showTitle?: boolean;
}

const AnimeGridSkeleton: React.FC<AnimeGridSkeletonProps> = ({
  count = 12,
  showTitle = true
}) => {

  return (
    <Box sx={{ width: '100%' }}>
      {showTitle && (
        <Box sx={{ mb: 3 }} flex={{ display: 'flex', flexDirection: 'column' }} alignItems={{ xs: 'center', md: 'start' }}>
          <Skeleton variant="text" width="200px" height={30} animation="wave" />
          <Skeleton variant="text" width="300px" height={24} animation="wave" sx={{ mt: 1 }} />
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',          
            sm: 'repeat(auto-fill, minmax(225px, 225px))'
          },
          gridAutoRows: '1fr',
          gap: { xs: 2, md: 3 },
          justifyContent: { xs: 'center', sm: 'start' },
          margin: { xs: '0 auto' }
        }}
      >
        {Array(count).fill(0).map((_, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', lg: 'flex-start' }
            }}
          >
            <AnimeCardSkeleton />
          </Box>
        ))}
      </Box>

      {/* Pagination skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Skeleton variant="rectangular" width={300} height={36} animation="wave" />
      </Box>
    </Box>
  );
};

export default AnimeGridSkeleton;
