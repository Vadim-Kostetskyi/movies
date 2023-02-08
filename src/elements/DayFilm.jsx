import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDayMovie } from 'constants/dafaultApi';
const DayFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDayMovie().then(el => setMovies(el.data.results));
  }, []);

  const location = useLocation();

  return (
    <div>
      <h1>Trending todey</h1>
      <ul>
        {movies.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link
                state={`${location.pathname}${location.search}`}
                to={`/movies/${id}`}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DayFilm;
