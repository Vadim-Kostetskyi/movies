import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDayMovie } from 'constants/dafaultApi';
const DayFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDayMovie().then(el => {
      setMovies(el.data.results);
      // console.log(el.data.results);
    });
  }, []);

  const location = useLocation();

  return (
    <div>
      <h1>Trending todey</h1>
      <ul className="day-list">
        {movies.map(({ id, title, poster_path }) => {
          return (
            <li className="day-list-item" key={id}>
              <Link
                className="day-link"
                state={`${location.pathname}${location.search}sfsfsdfsdf`}
                to={`/movies/${id}`}
              >
                <span className="day-text">{title}</span>

                <div className="img-box">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt=""
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DayFilm;
