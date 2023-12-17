import { useState, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SearchInput from 'components/SearchInput';
import MovieCards from 'components/MovieCards';
import { moveImage } from 'helpers';
import styles from '../DayFilm/index.module.css';

const SearchMovie = () => {
  const [inputValue, setInputValue] = useState('');
  const [filmList, setFilmList] = useState([]);
  const boxRef = useRef(null);

  const { pathname } = useLocation();

  const inputChange = el => {
    const { value } = el.currentTarget;
    setInputValue(value.toLowerCase());
  };

  const clearImage = () => {
    setInputValue('');
  };

  const memorizeFilms = films => {
    setFilmList(films);
  };

  return (
    <div>
      <SearchInput
        boxRef={boxRef}
        onChange={inputChange}
        value={inputValue}
        clearImage={clearImage}
        memorizeFilms={memorizeFilms}
      />
      <MovieCards list={filmList} moveImage={moveImage} pathname={pathname} />
      {filmList.length > 0 ? <ul className={styles.list}></ul> : null}
      <Outlet />
    </div>
  );
};

export default SearchMovie;
