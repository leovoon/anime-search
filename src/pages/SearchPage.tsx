import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import AnimeGrid from '../components/anime/AnimeGrid';
import AnimeGridSkeleton from '../components/anime/AnimeGridSkeleton';
import Pagination from '../components/common/Pagination';
import ErrorState from '../components/common/ErrorState';
import useDebounce from '../hooks/useDebounce';
import useAnimeSearch from '../hooks/useAnimeSearch';
import useTopAnime from '../hooks/useTopAnime';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  // Jikan API has a maximum limit of 25 items per page
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Add auto-animate to the results container
  const [resultsRef] = useAutoAnimate({
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design standard easing
    disrespectUserMotionPreference: false // Respect user's reduced motion preference
  });

  // Fetch search results when search term is not empty
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch
  } = useAnimeSearch(debouncedSearchTerm, page, itemsPerPage);

  // Fetch top anime when search term is empty
  const {
    data: topAnimeData,
    isLoading: isTopAnimeLoading,
    error: topAnimeError,
    refetch: refetchTopAnime
  } = useTopAnime(page, itemsPerPage);

  // Determine which data to use based on search term
  const data = debouncedSearchTerm ? searchData : topAnimeData;
  const isLoading = debouncedSearchTerm ? isSearchLoading : isTopAnimeLoading;
  const error = debouncedSearchTerm ? searchError : topAnimeError;
  const refetch = debouncedSearchTerm ? refetchSearch : refetchTopAnime;

  // Reset to page 1 when search term or items per page changes
  React.useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, itemsPerPage]);

  return (
    <>
      <Header title="Anime Search App" />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, lg: 0 },
          pb: 4
        }}
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />

        <Box ref={resultsRef} sx={{ minHeight: '50vh' }}>
          {/* Each state has a unique key for better animation */}
          {isLoading ? (
            <div key="loading">
              <AnimeGridSkeleton showTitle={!debouncedSearchTerm} />
            </div>
          ) : error ? (
            <div key="error">
              <ErrorState
                error={error}
                onRetry={() => refetch()}
              />
            </div>
          ) : debouncedSearchTerm && data && data.data && data.data.length === 0 ? (
            <div key="no-results">
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="h6">
                  No results found for "{debouncedSearchTerm}"
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                  Try different keywords or check your spelling
                </Typography>
              </Box>
            </div>
          ) : !debouncedSearchTerm ? (
            <div key="popular">
              <Box sx={{ textAlign: { xs: 'center', md: 'left' }, py: 3 }}>
                <Typography variant="h6">
                  Popular Anime
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  Showing top rated anime. Search above to find more!
                </Typography>
              </Box>
              {data && data.data && data.data.length > 0 && data.pagination && (
                <>
                  <AnimeGrid animes={data.data} />
                  <Pagination
                    onPageChange={setPage}
                    itemsPerPage={itemsPerPage}
                    onItemsPerPageChange={setItemsPerPage}
                    paginationInfo={data.pagination}
                  />
                </>
              )}
            </div>
          ) : data && data.data && data.data.length > 0 && data.pagination ? (
            <div key="results">
              <AnimeGrid animes={data.data} />
              <Pagination
                onPageChange={setPage}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={setItemsPerPage}
                paginationInfo={data.pagination}
              />
            </div>
          ) : (
            <div key="empty">
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="body1" color="text.secondary">
                  No data available
                </Typography>
              </Box>
            </div>
          )}
        </Box>
      </Container>
    </>
  );
};

export default SearchPage;
