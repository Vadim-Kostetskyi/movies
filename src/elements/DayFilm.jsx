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

  async function moveImage(el) {
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
    const response = await fetch(nextUrl);
    const html = await response.text();
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
    window.location.href = response.url;
  }

  return (
    <div>
      <h1>Trending todey</h1>
      <ul className="day-list">
        {movies.map(({ id, title, poster_path }) => {
          return (
            <li className="day-list-item" key={id}>
              <Link
                onClick={moveImage}
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
