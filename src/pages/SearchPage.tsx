import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import SearchBar from '../components/common/SearchBar';
import AnimeGrid from '../components/anime/AnimeGrid';
import AnimeGridSkeleton from '../components/anime/AnimeGridSkeleton';
import Pagination from '../components/common/Pagination';
import ErrorState from '../components/common/ErrorState';
import BackToTop from '../components/common/BackToTop';
import SEOHelmet from '../components/common/SEOHelmet';
import useDebounce from '../hooks/useDebounce';
import useAnimeSearch from '../hooks/useAnimeSearch';
import useTopAnime from '../hooks/useTopAnime';

import { useNavigate } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize searchTerm from URL query parameter 'q'
  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('q') || '';
  });
  // Initialize page state from localStorage or location state, defaulting to 1
  const [page, setPage] = useState<number>(() => {
    // Check URL query parameters first
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    if (pageParam) {
      const parsedPage = parseInt(pageParam, 10);
      if (!isNaN(parsedPage) && parsedPage >= 1) {
        return parsedPage;
      }
    }

    // Fallback to localStorage
    const savedPage = localStorage.getItem('animeSearchPage');
    if (savedPage) {
      const parsedPage = parseInt(savedPage, 10);
      return isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
    }

    return 1;
  });

  // Jikan API has a maximum limit of 25 items per page
  const [itemsPerPage, setItemsPerPage] = useState<number>(() => {
    const savedItemsPerPage = localStorage.getItem('animeSearchItemsPerPage');
    if (savedItemsPerPage) {
      const parsedItems = parseInt(savedItemsPerPage, 10);
      return isNaN(parsedItems) || parsedItems > 25 || parsedItems < 1 ? 20 : parsedItems;
    }
    return 20;
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  // Reference to the search input for focusing
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);
  const prevDebouncedSearchTermRef = useRef<string>(debouncedSearchTerm);
  const prevItemsPerPageRef = useRef<number>(itemsPerPage);

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

  // Reset to page 1 when search term or items per page changes, but not on initial load if page is from URL
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      // Store initial values after the first render completes and initial page is set
      prevDebouncedSearchTermRef.current = debouncedSearchTerm;
      prevItemsPerPageRef.current = itemsPerPage;
      return;
    }

    // Only reset to page 1 if debouncedSearchTerm or itemsPerPage *actually change* from their previous values
    if (
      debouncedSearchTerm !== prevDebouncedSearchTermRef.current ||
      itemsPerPage !== prevItemsPerPageRef.current
    ) {
      setPage(1);
    }

    // Update previous values for the next render
    prevDebouncedSearchTermRef.current = debouncedSearchTerm;
    prevItemsPerPageRef.current = itemsPerPage;
  }, [debouncedSearchTerm, itemsPerPage, setPage]);

  // Save page and itemsPerPage to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('animeSearchPage', page.toString());
  }, [page]);

  useEffect(() => {
    localStorage.setItem('animeSearchItemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  // Update URL when page, debouncedSearchTerm, or itemsPerPage change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm);
    }
    params.set('page', page.toString());
    // navigate(`?${params.toString()}`, { replace: true }); // avoid this causing issue with useeffect reset page
    // Update URL without triggering a full navigation, preserving history state
    window.history.replaceState(null, '', `?${params.toString()}`);
  }, [debouncedSearchTerm, page, itemsPerPage, navigate]);


  // Create structured data for the search page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Anime App',
    'url': 'https://anime-searchh.vercel.app',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://anime-searchh.vercel.app/?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <SEOHelmet
        title={debouncedSearchTerm ? `Search results for "${debouncedSearchTerm}"` : "Anime Search"}
        description="Search and discover anime from our extensive database. Find detailed information about your favorite anime series, movies, and more."
        canonicalUrl="https://anime-searchh.vercel.app"
        structuredData={structuredData}
      />
      <Header title="Anime Search App" />
      <Container
        maxWidth={false}
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, xl: 0 },
          pb: 4
        }}
      >
        <SearchBar
          ref={searchInputRef}
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
                  <AnimeGrid animes={data.data} currentPage={page} />
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
              <AnimeGrid animes={data.data} currentPage={page} searchTerm={debouncedSearchTerm} />
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

      {/* Back to top button */}
      <BackToTop
        onClick={() => {
          // Focus the search input when the back to top button is clicked
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }}
      />
    </>
  );
};

export default SearchPage;
