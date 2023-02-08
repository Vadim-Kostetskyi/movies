import { useState } from 'react';
import { Outlet, Link, useSearchParams } from 'react-router-dom';
import { getMovieByName } from 'constants/dafaultApi';

const Movie = () => {
  const [imageNameInput, setImageNameInput] = useState('');
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams);

  const inputChange = el => {
    const { value } = el.currentTarget;
    setImageNameInput(value.toLowerCase());
  };

  const handleSubmit = el => {
    el.preventDefault();
    console.log(films);

    getMovieByName(imageNameInput).then(el => {
      setFilms(el.data.results);
    });
    setSearchParams({ query: imageNameInput });
    setImageNameInput('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={inputChange} value={imageNameInput} />
        <button type="submit">Search</button>
      </form>
      {films.length > 0 && (
        <ul>
          {films.map(({ original_title, id }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{original_title}</Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default Movie;
