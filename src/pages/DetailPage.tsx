import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/common/Header';
import ErrorState from '../components/common/ErrorState';
import AnimeDetails from '../components/anime/AnimeDetails';
import AnimeDetailsSkeleton from '../components/anime/AnimeDetailsSkeleton';
import api from '../services/api';

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['animeDetail', id],
    queryFn: () => api.getAnimeDetail(id as string),
    enabled: !!id,
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header title="Anime Details" />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, lg: 0 },
          pb: 4
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Search
        </Button>

        <Box sx={{ minHeight: '70vh' }}>
          {isLoading && <AnimeDetailsSkeleton />}

          {error && (
            <ErrorState
              error={error}
              onRetry={() => refetch()}
            />
          )}

          {!isLoading && !error && data?.data && (
            <AnimeDetails anime={data.data} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default DetailPage;
