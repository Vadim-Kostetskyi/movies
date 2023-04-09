import axios from 'axios';
import { App } from 'components/App';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '169f25cf5fe3e465b78878af422f41bc';

export const instance = axios.create({
  baseURL: BASE_URL,
});

export const getDayMovie = () => {
  return instance.get(`trending/movie/day?api_key=${API_KEY}`);
};

export const getMovieById = id => {
  return instance.get(`movie/${id}?api_key=${API_KEY}&language=en-US`);
};

export const getMovieImg = id => {
  return instance.get(`movie/${id}/images?api_key=${API_KEY}&language=en-US`);
};

export const getReviews = id => {
  return instance.get(
    `movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
};

export const getActors = id => {
  return instance.get(`movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
};

export const getMovieByName = name => {
  return instance.get(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=1&include_adult=false`
  );
};
