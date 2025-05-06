import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

/**
 * Custom hook for fetching top anime with React Query
 * @param page The current page number
 * @param limit The number of results per page
 * @returns Query result with top anime data
 */
const useTopAnime = (page: number, limit: number = 20) => {
  return useQuery({
    queryKey: ['topAnime', page, limit],
    queryFn: () => api.getTopAnime(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export default useTopAnime;
