import { useEffect, useState, useRef } from 'react';
import {
  Outlet,
  Link,
  useSearchParams,
  useLocation,
  // navigate,
} from 'react-router-dom';
import { getMovieByName } from 'constants/dafaultApi';
import lupa from './lupa.png';

const Movie = () => {
  const [imageNameInput, setImageNameInput] = useState('');
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const boxRef = useRef(null);

  const scrollToHeader = () => {
    console.log(boxRef.current);
  };

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
        console.log(el);
        setFilms(el.data.results);
      });
      setSearchParams({ query: imageNameInput });
      setImageNameInput('');

      scrollToHeader();

      boxRef.current.classList.add('input-box');
    }
  };

  async function moveImage(el) {
    console.log(el.currentTarget);
    el.preventDefault();

    console.log(el.currentTarget.href);

    const rect = el.currentTarget.getBoundingClientRect();
    const topOffset = 108.6 - rect.top;
    const leftOffset = 30 - rect.left;

    document.body.style.overflow = 'hidden';

    el.currentTarget.style.position = 'relative';

    el.currentTarget.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;

    const nextUrl = el.currentTarget.href;

    // Попереднє завантаження сторінки за допомогою fetch
    // const response = await fetch(nextUrl);
    // const html = await response.text();
    // await new Promise(resolve =>
    //   setTimeout(() => {
    //     resolve();
    //   }, 1000)
    // );
    // window.location.href = response.url;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="box" ref={boxRef}>
          <input
            className="input"
            type="text"
            onChange={inputChange}
            value={imageNameInput}
            placeholder="Search"
          />
          <button className="search-btn" type="submit">
            <img className="search-img" src={lupa} alt="" />
          </button>
        </div>
      </form>
      {films.length > 0 && (
        <ul className="day-list">
          {films.map(({ original_title, id, poster_path }) => (
            <li key={id} className="day-list-item">
              <Link
                onClick={moveImage}
                className="day-link"
                state={`${location.pathname}${location.search}`}
                rel="prefetch"
                href={`/movies/${id}`}
                to={`/movies/${id}`}
              >
                <span className="day-text">{original_title}</span>
                <div className="img-box">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt=""
                  />
                </div>
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
