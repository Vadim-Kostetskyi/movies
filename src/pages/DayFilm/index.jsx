import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDayMovie } from 'API/dafaultApi';
import MovieCards from 'components/MovieCards';
import { moveImage } from 'helpers';

const DayFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDayMovie().then(el => {
      setMovies(el.data.results);
    });
  }, []);

  const { pathname } = useLocation();

  return (
    <div>
      <h1>Trending todey</h1>
      <MovieCards list={movies} moveImage={moveImage} pathname={pathname} />
    </div>
  );
};

export default DayFilm;
