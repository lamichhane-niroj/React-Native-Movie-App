const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODgwYTgxZTg5MzRiZjMzOWIwODRiODBkNjJhYzIzNCIsIm5iZiI6MTc2MjMyMTI4OS42MjEsInN1YiI6IjY5MGFlMzg5NTY2MTA0Y2Y0NTA3MGRkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E9vjqU92EiPlczJWkZnNm9Yc5mqs0woqqJpj8esr1Hs';

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/movie/popular?language=en-US&page=1`;

    // console.log('Fetching from endpoint:', endpoint);
    // console.log('Using headers:', TMDB_CONFIG.headers);

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();

    return data.results;
}


