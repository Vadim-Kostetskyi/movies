import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getDayMovie } from 'API/dafaultApi';
import MovieCard from 'components/MovieCard';
import styles from './index.module.css';

const DayFilm = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getDayMovie().then(el => {
      setMovies(el.data.results);
    });
  }, []);

  const { pathname, search } = useLocation();

  async function moveImage(el) {
    el.preventDefault();

    const imgElement = el.currentTarget.querySelector('img');
    const imgBox =
      el.currentTarget.getElementsByClassName('image-box-backdrop')[0];
    const rect = el.currentTarget.getBoundingClientRect();
    const topOffset = 108.6 - rect.top;
    const leftOffset = 30 - rect.left;

    document.body.style.overflow = 'hidden';
    imgElement.style.position = 'relative';
    imgElement.style.zIndex = '5';
    imgBox.classList.add('backdrop');
    imgElement.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;

    const nextUrl = el.currentTarget.href;
    const response = await fetch(nextUrl);
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
      <ul className={styles.list}>
        {movies.map(({ id, title, poster_path, vote_average }) => {
          return (
            <li className={styles.listItem} key={id}>
              <MovieCard
                id={id}
                moveImage={moveImage}
                pathname={pathname}
                search={search}
                voteAverage={vote_average}
                posterPath={poster_path}
                title={title}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DayFilm;
