import axios from 'axios';
import type { AnimeResponse, AnimeDetailResponse } from '../types/anime';

const API_BASE_URL = 'https://api.jikan.moe/v4';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add rate limiting handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle rate limiting (429 Too Many Requests)
    if (error.response && error.response.status === 429) {
      // Wait for 1 second and retry the request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return apiClient.request(error.config);
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Search anime with pagination
  searchAnime: async (query: string, page: number = 1, limit: number = 20): Promise<AnimeResponse> => {
    const response = await apiClient.get<AnimeResponse>('/anime', {
      params: {
        q: query,
        page,
        limit,
      },
    });
    return response.data;
  },

  // Get detailed information about a specific anime
  getAnimeDetail: async (id: string): Promise<AnimeDetailResponse> => {
    const response = await apiClient.get<AnimeDetailResponse>(`/anime/${id}/full`);
    return response.data;
  },

  // Get top anime with pagination
  getTopAnime: async (page: number = 1, limit: number = 20): Promise<AnimeResponse> => {
    const response = await apiClient.get<AnimeResponse>('/top/anime', {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  },
};

export default api;
