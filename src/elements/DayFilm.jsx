import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDayMovie } from 'constants/dafaultApi';
const DayFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDayMovie().then(el => {
      setMovies(el.data.results);
      console.log(el.data.results);
    });
  }, []);

  const location = useLocation();

  async function moveImage(el) {
    el.preventDefault();

    const imgElement = el.currentTarget.querySelector('img');
    const imgBox =
      el.currentTarget.getElementsByClassName('img-box-backdrop')[0];
    // console.log(imgBox);

    const rect = el.currentTarget.getBoundingClientRect();
    const topOffset = 108.6 - rect.top;
    const leftOffset = 30 - rect.left;

    document.body.style.overflow = 'hidden';

    imgElement.style.position = 'relative';
    imgElement.style.zIndex = '5';
    imgBox.classList.add('backdrop');

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
        {movies.map(({ id, title, poster_path, vote_average }) => {
          return (
            <li className="day-list-item" key={id}>
              <Link
                onClick={moveImage}
                className="day-link"
                state={`${location.pathname}${location.search}`}
                to={`/movies/${id}`}
              >
                <div className="img-box">
                  <div className="day-list-vote_average">
                    {vote_average.toFixed(1)}
                  </div>
                  <div className="img-box-backdrop"></div>

                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt=""
                  />
                </div>
                <span className="day-text">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DayFilm;
