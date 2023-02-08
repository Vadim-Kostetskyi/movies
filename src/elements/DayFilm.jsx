import { lazy, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDayMovie } from 'constants/dafaultApi';
const DayFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDayMovie().then(el => setMovies(el.data.results));
  }, []);

  return (
    <div>
      <h1>Trending todey</h1>
      <ul>
        {movies.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
// export const Home = () => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     getDayMovie().then(setMovies);
//   }, []);
//   console.log(movies);
//   return <div>123123132</div>;
// };

export default DayFilm;
