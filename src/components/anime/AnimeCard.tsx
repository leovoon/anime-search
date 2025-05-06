import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import type { AnimeData } from '../../types/anime';
import api from '../../services/api';

interface AnimeCardProps {
  anime: AnimeData;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch the anime detail data when hovering
    queryClient.prefetchQuery({
      queryKey: ['animeDetail', anime.mal_id.toString()],
      queryFn: () => api.getAnimeDetail(anime.mal_id.toString()),
    });
  };

  return (
    <Card
      component={Link}
      viewTransition
      to={`/anime/${anime.mal_id}`}
      onMouseEnter={handleMouseEnter}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <Box sx={{
        position: 'relative',
        paddingTop: '150%', // 2:3 aspect ratio (3/2 * 100%)
        width: '100%'
      }}>
        <CardMedia
          component="img"
          image={anime.images.jpg.image_url}
          alt={anime.title}
          style={{ viewTransitionName: `image-expand-${anime.mal_id}` }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{
            fontWeight: 'medium',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.2em',
            height: '2.4em'
          }}
        >
          {anime.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {anime.type || 'Unknown'}
          </Typography>
          {anime.score > 0 && (
            <Typography variant="body2" color="primary" fontWeight="bold">
              ★ {anime.score.toFixed(1)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
