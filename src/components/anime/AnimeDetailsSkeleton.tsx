import React from 'react';
import { Box, Grid, Skeleton, Divider, Paper } from '@mui/material';

const AnimeDetailsSkeleton: React.FC = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        {/* Left column - Image and basic info */}
        <Grid size= {{ xs: 12, md: 3 }}>
          {/* Image skeleton with proper aspect ratio */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: '300px',
            paddingTop: '150%', // 2:3 aspect ratio
          }}>
            <Skeleton
              variant="rectangular"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: 1
              }}
              animation="wave"
            />
          </Box>

          {/* Information section */}
          <Skeleton variant="text" width="100px" height={28} sx={{ mt: 2 }} animation="wave" />
          <Divider sx={{ my: 1 }} />

          {/* Information items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {Array(5).fill(0).map((_, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="text" width="60px" height={20} animation="wave" />
                <Skeleton variant="text" width="120px" height={20} sx={{ ml: 1 }} animation="wave" />
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right column - Details */}
        <Grid size= {{ xs: 12, md: 9 }}>
          {/* Title */}
          <Box sx={{ mb: 1 }}>
            <Skeleton variant="text" width="60%" height={36} animation="wave" />
            <Skeleton variant="text" width="30%" height={24} animation="wave" sx={{ mt: 0.5 }} />
          </Box>

          {/* Stats */}
          <Box sx={{ my: 3 }}>
            <Grid container spacing={2}>
              {Array(4).fill(0).map((_, index) => (
                <Grid size= {{ xs: 6, sm: 3 }} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      height: '100%',
                      backgroundColor: '#f5f5f5',
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Skeleton variant="circular" width={20} height={20} animation="wave" />
                      <Skeleton variant="text" width="40%" height={20} sx={{ ml: 1 }} animation="wave" />
                    </Box>
                    <Skeleton variant="text" width="60%" height={28} animation="wave" />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Synopsis */}
          <Skeleton variant="text" width="100px" height={28} sx={{ mt: 3 }} animation="wave" />
          <Box sx={{ mt: 1 }}>
            {Array(4).fill(0).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={index % 2 === 0 ? "100%" : "95%"}
                height={20}
                sx={{ mt: 1 }}
                animation="wave"
              />
            ))}
          </Box>

          {/* Genres */}
          <Skeleton variant="text" width="80px" height={28} sx={{ mt: 4 }} animation="wave" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            {Array(6).fill(0).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={70}
                height={28}
                sx={{ borderRadius: 4 }}
                animation="wave"
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimeDetailsSkeleton;
