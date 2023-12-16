import { useEffect, useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { getMovieByName } from 'API/dafaultApi';
import SearchInput from 'components/SearchInput';
import MovieCard from 'components/MovieCard';
import styles from '../DayFilm/index.module.css';

const Movie = () => {
  const [imageNameInput, setImageNameInput] = useState('');
  const [filmList, setFilmList] = useState([]);
  const boxRef = useRef(null);

  const { pathname, search } = useLocation();
  const fromQueryString = search.replace(/\?query=/, '');

  // const path = document.location.href.length;

  const inputChange = el => {
    const { value } = el.currentTarget;
    setImageNameInput(value.toLowerCase());
  };

  useEffect(() => {
    if (fromQueryString) {
      getMovieByName(fromQueryString).then(el => {
        setFilmList(el.data.results);
      });
    }
  }, [fromQueryString]);

  const clearImage = () => {
    setImageNameInput('');
  };

  const memorizeFilms = films => {
    setFilmList(films);
  };

  async function moveImage(el) {
    console.log(el.currentTarget);
    el.preventDefault();

    const imgElement = el.currentTarget.querySelector('img');
    const imgBox =
      el.currentTarget.getElementsByClassName('img-box-backdrop')[0];
    const rect = el.currentTarget.getBoundingClientRect();
    const topOffset = 108.6 - rect.top;
    const leftOffset = 30 - rect.left;

    document.body.style.overflow = 'hidden';
    imgElement.style.position = 'relative';
    imgElement.style.zIndex = '5';
    imgBox.classList.add('backdrop');

    imgElement.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;
  }

  return (
    <div>
      <SearchInput
        boxRef={boxRef}
        onChange={inputChange}
        imageName={imageNameInput}
        clearImage={clearImage}
        memorizeFilms={memorizeFilms}
      />
      {filmList.length > 0 ? (
        <ul className={styles.list}>
          {filmList.map(({ original_title, id, poster_path, vote_average }) => (
            <li key={id} className={styles.listItem}>
              <MovieCard
                id={id}
                moveImage={moveImage}
                pathname={pathname}
                search={search}
                voteAverage={vote_average}
                posterPath={poster_path}
                title={original_title}
              />
            </li>
          ))}
        </ul>
      ) : null}
      <Outlet />
    </div>
  );
};

export default Movie;
