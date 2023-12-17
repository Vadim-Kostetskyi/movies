import loupe from 'assets/image/loupe.png';
import { getMovieByName } from 'API/dafaultApi';
import styles from './index.module.css';

const SearchInput = ({
  boxRef,
  onChange,
  value,
  clearImage,
  memorizeFilms,
}) => {
  const handleSubmit = el => {
    el.preventDefault();

    if (value) {
      getMovieByName(value).then(el => {
        console.log(el);
        memorizeFilms(el.data.results);
      });
      clearImage();
      boxRef.current.classList.add(styles.inputBox);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.box} ref={boxRef}>
        <input
          className={styles.input}
          type="text"
          onChange={onChange}
          value={value}
          placeholder="Search"
        />
        <button className={styles.searchBtn} type="submit">
          <img className={styles.searchImg} src={loupe} alt="" />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
