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
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width="200px" height={32} animation="wave" />
          <Skeleton variant="text" width="300px" height={24} animation="wave" sx={{ mt: 1 }} />
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, minmax(0, 1fr))',                     // 1 column on extra small screens
            sm: 'repeat(2, minmax(0, 1fr))',                     // 2 columns on small screens
            md: 'repeat(auto-fit, minmax(225px, 1fr))',          // Auto-fit for md screens
            lg: 'repeat(auto-fill, 225px)'                       // Fixed width columns for lg screens
          },
          gridAutoRows: '1fr',
          gap: { xs: 2, md: 3 },
          justifyContent: { xs: 'center', lg: 'start' },
          margin: { xs: '0 auto', lg: 0 }
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
