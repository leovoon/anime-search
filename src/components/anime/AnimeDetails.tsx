import React from 'react';
import { Box, Typography, Chip, Grid, Divider } from '@mui/material';
import type { AnimeData } from '../../types/anime';
import AnimeStats from './AnimeStats';

interface AnimeDetailsProps {
  anime: AnimeData;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ anime }) => {
  return (
    <Box className="anime-details">
      <Grid container spacing={4}>
        {/* Left column - Image and basic info */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            style={{ viewTransitionName: `image-expand-${anime.mal_id}` }}
            component="img"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            sx={{
              width: '100%',
              maxWidth: '300px',
              borderRadius: 1,
              boxShadow: 3,
              mb: 2,
            }}
          />

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
            Information
          </Typography>
          <Divider sx={{ my: 1 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {anime.type && (
              <Box>
                <Typography variant="body2" color="text.secondary" component="span">
                  Type:
                </Typography>{' '}
                <Typography variant="body2" component="span">
                  {anime.type}
                </Typography>
              </Box>
            )}

            {anime.episodes && (
              <Box>
                <Typography variant="body2" color="text.secondary" component="span">
                  Episodes:
                </Typography>{' '}
                <Typography variant="body2" component="span">
                  {anime.episodes}
                </Typography>
              </Box>
            )}

            {anime.status && (
              <Box>
                <Typography variant="body2" color="text.secondary" component="span">
                  Status:
                </Typography>{' '}
                <Typography variant="body2" component="span">
                  {anime.status}
                </Typography>
              </Box>
            )}

            {anime.aired && (
              <Box>
                <Typography variant="body2" color="text.secondary" component="span">
                  Aired:
                </Typography>{' '}
                <Typography variant="body2" component="span">
                  {anime.aired.string}
                </Typography>
              </Box>
            )}

            {anime.studios && anime.studios.length > 0 && (
              <Box>
                <Typography variant="body2" color="text.secondary" component="span">
                  Studios:
                </Typography>{' '}
                <Typography variant="body2" component="span">
                  {anime.studios.map(studio => studio.name).join(', ')}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Right column - Details */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {anime.title}
            {anime.title_english && anime.title_english !== anime.title && (
              <Typography variant="h6" component="span" color="text.secondary" sx={{ ml: 1 }}>
                ({anime.title_english})
              </Typography>
            )}
          </Typography>

          {/* Stats */}
          <Box sx={{ my: 3 }}>
            <Grid container spacing={2}>
              <AnimeStats
                score={anime.score}
                rank={anime.rank}
                popularity={anime.popularity}
                members={anime.members}
              />
            </Grid>
          </Box>

          {/* Synopsis */}
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Synopsis
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {anime.synopsis || 'No synopsis available.'}
          </Typography>

          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Genres
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {anime.genres.map((genre) => (
                  <Chip
                    key={genre.mal_id}
                    label={genre.name}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimeDetails;
