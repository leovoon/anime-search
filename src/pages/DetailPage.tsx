import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Header from '../components/common/Header';
import ErrorState from '../components/common/ErrorState';
import AnimeDetails from '../components/anime/AnimeDetails';
import AnimeDetailsSkeleton from '../components/anime/AnimeDetailsSkeleton';
import ScrollToTop from '../components/common/ScrollToTop';
import SEOHelmet from '../components/common/SEOHelmet';
import api from '../services/api';
import { AnimeGenre } from '../types/anime';

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

  // Create structured data for the anime detail page if data is available
  const structuredData = data?.data ? {
    '@context': 'https://schema.org',
    '@type': 'TVSeries',
    'name': data.data.title,
    'alternateName': data.data.title_english || data.data.title_japanese,
    'image': data.data.images.jpg.large_image_url,
    'description': data.data.synopsis,
    'contentRating': data.data.rating,
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': data.data.score,
      'ratingCount': data.data.scored_by,
      'bestRating': '10',
      'worstRating': '1'
    },
    'genre': data.data.genres.map((genre: AnimeGenre) => genre.name),
    'numberOfEpisodes': data.data.episodes,
    'datePublished': data.data.aired?.from,
    'url': data.data.url
  } : undefined;

  return (
    <>
      <SEOHelmet
        title={data?.data ? data.data.title : "Anime Details"}
        description={data?.data ? data.data.synopsis?.substring(0, 160) + '...' : "Loading anime details..."}
        canonicalUrl={data?.data ? `https://anime-searchh.vercel.app/anime/${id}` : undefined}
        structuredData={structuredData}
        meta={data?.data ? [
          { name: 'keywords', content: `anime, ${data.data.title}, ${data.data.genres.map((g: AnimeGenre) => g.name).join(', ')}` }
        ] : []}
      />
      <ScrollToTop />
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
