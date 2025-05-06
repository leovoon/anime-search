# Anime Search App

A modern, responsive web application for searching and exploring anime using the Jikan API. Built with React, TypeScript, and Material UI.

![Anime App Screenshot](https://i.postimg.cc/tgXYcWwR/image.png)

## Features

- **Anime Search**: Search for anime by title with debounced input
- **Responsive Design**: Optimized for all screen sizes with adaptive grid layouts
- **Pagination**: Browse through search results with customizable items per page
- **Detailed Anime Information**: View comprehensive details about each anime
- **Top Anime Showcase**: Discover popular anime when no search is active
- **Smooth Transitions**: Enjoy fluid animations between pages and states
- **Prefetching**: Hover over anime cards to prefetch details for faster loading

## Technology Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **Routing**: React Router v7
- **API Handling**: TanStack React Query
- **HTTP Client**: Axios
- **Animations**: @formkit Auto-Animate

## API Integration

This application uses the [Jikan API](https://docs.api.jikan.moe/) (v4), an unofficial MyAnimeList API, to fetch anime data. Key endpoints used:

- Search anime: `/anime?q={query}&page={page}&limit={limit}`
- Get anime details: `/anime/{id}/full`
- Get top anime: `/top/anime?page={page}&limit={limit}`

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/anime-app.git
   cd anime-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Searching for Anime

1. Type in the search bar to find anime by title
2. Results will appear automatically as you type (with 250ms debounce)
3. Use the pagination controls at the bottom to navigate through results
4. Adjust the "Items per page" dropdown to change how many results are displayed

### Viewing Anime Details

1. Click on any anime card to view detailed information
2. Navigate back using the back button or browser navigation
3. Hover over anime cards to prefetch details for faster loading

### Browsing Top Anime

When no search term is entered, the app displays a list of top-rated anime.

## Responsive Design

The application is fully responsive with the following breakpoints:

- **Extra Small (xs)**: 1 column grid
- **Small (sm)**: 2 column grid
- **Medium (md) and above**: Multi-column grid with 225px card width

## Project Structure

```
anime-app/
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   │   ├── anime/        # Anime-specific components
│   │   └── common/       # Shared components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   └── router.tsx        # Routing configuration
├── index.html            # HTML template
└── package.json          # Project dependencies and scripts
```

## Performance Optimizations

This application implements several performance optimizations:

- **Debounced Search**: Prevents excessive API calls while typing
- **Data Prefetching**: Preloads anime details on hover for faster navigation
- **React Query Caching**: Efficiently caches API responses to reduce network requests
- **Pagination**: Limits the number of items rendered at once
- **Lazy Loading**: Components and images load only when needed
- **Smooth Animations**: Uses hardware-accelerated animations for better performance
- **API Rate Limiting Handling**: Automatically retries requests when hitting API rate limits

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check for code issues
- `npm run preview` - Preview the production build locally

### API Limitations

The Jikan API has some limitations to be aware of:

- Maximum of 25 items per page in search results
- Rate limiting (3 requests per second)
- Occasional downtime or slow responses

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing the anime data
- [Material UI](https://mui.com/) for the component library
- [React Query](https://tanstack.com/query/latest) for data fetching and caching
- [Vite](https://vitejs.dev/) for the fast development experience
