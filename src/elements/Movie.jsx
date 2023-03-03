import { useEffect, useState } from 'react';
import { Outlet, Link, useSearchParams, useLocation } from 'react-router-dom';
import { getMovieByName } from 'constants/dafaultApi';
const Movie = () => {
  const [imageNameInput, setImageNameInput] = useState('');
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const fromQueryString = location.search.replace(/\?query=/, '');

  // const path = document.location.href.length;

  const inputChange = el => {
    const { value } = el.currentTarget;
    setImageNameInput(value.toLowerCase());
  };

  useEffect(() => {
    if (fromQueryString) {
      getMovieByName(fromQueryString).then(el => {
        setFilms(el.data.results);
      });
    }
  }, []);

  const handleSubmit = el => {
    el.preventDefault();

    if (imageNameInput) {
      getMovieByName(imageNameInput).then(el => {
        setFilms(el.data.results);
      });
      setSearchParams({ query: imageNameInput });
      setImageNameInput('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={inputChange}
          value={imageNameInput}
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form>
      {films.length > 0 && (
        <ul>
          {films.map(({ original_title, id }) => (
            <li key={id}>
              <Link
                state={`${location.pathname}${location.search}`}
                to={`/movies/${id}`}
              >
                {original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default Movie;
