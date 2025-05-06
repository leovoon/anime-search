import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import AnimeCard from './AnimeCard';
import type { AnimeData } from '../../types/anime';

interface AnimeGridProps {
  animes: AnimeData[];
}

const AnimeGrid: React.FC<AnimeGridProps> = ({ animes }) => {
  // Use auto-animate for the grid container
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design standard easing
    disrespectUserMotionPreference: false // Respect user's reduced motion preference
  });

  if (animes.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 5 }}>
        <Typography variant="h6" color="text.secondary">
          No results found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your search terms
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        ref={parent}
        className="anime-list"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',          
            sm: 'repeat(auto-fill, minmax(225px, 225px))'
          },
          gridAutoRows: '1fr',
          gap: { xs: 2, md: 3 },
          justifyContent: { xs: 'center', sm: 'start' },
          margin: { xs: '0 auto'}
        }}
      >
        {animes.map((anime) => (
          <Box
            key={`anime-card-${anime.mal_id}` }
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', lg: 'flex-start' }
            }}
          >
            <AnimeCard anime={anime} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AnimeGrid;
