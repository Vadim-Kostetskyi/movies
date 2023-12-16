export const Path = {
  home: '/',
  searchMovie: '/searchMovie',
};

export const PathById = movieId => ({
  info: `/searchMovie/${movieId}`,
  actors: `/searchMovie/${movieId}/cast`,
  reviews: `/searchMovie/${movieId}/reviews`,
});

export const PathToImage = path => `https://image.tmdb.org/t/p/w500/${path}`;
