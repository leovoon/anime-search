import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

/**
 * Custom hook for searching anime with React Query
 * @param query The search query
 * @param page The current page number
 * @param limit The number of results per page
 * @returns Query result with anime data
 */
const useAnimeSearch = (query: string, page: number, limit: number = 20) => {
  return useQuery({
    queryKey: ['animeSearch', query, page, limit],
    queryFn: () => api.searchAnime(query, page, limit),
    enabled: query.length > 0,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    // gcTime: 10 * 60 * 1000, // 10 minutes
    placeholderData: (previousData) => previousData,
  });
};

export default useAnimeSearch;
