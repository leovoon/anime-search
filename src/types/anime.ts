export interface AnimeImage {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface AnimeBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

export interface AnimeProducer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeData {
  mal_id: number;
  url: string;
  images: AnimeImage;
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
  };
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        day: number;
        month: number;
        year: number;
      };
      to: {
        day: number;
        month: number;
        year: number;
      };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: AnimeBroadcast;
  producers: AnimeProducer[];
  licensors: AnimeProducer[];
  studios: AnimeProducer[];
  genres: AnimeGenre[];
  explicit_genres: AnimeGenre[];
  themes: AnimeGenre[];
  demographics: AnimeGenre[];
}

export interface AnimePagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeResponse {
  pagination: AnimePagination;
  data: AnimeData[];
}

export interface AnimeDetailResponse {
  data: AnimeData;
}
