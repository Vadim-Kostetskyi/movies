import MovieCard from 'components/MovieCard';
import styles from './index.module.css';

const MovieCards = ({ list, moveImage, pathname }) =>
  list.length > 0 ? (
    <ul className={styles.list}>
      {list.map(({ title, original_title, id, poster_path, vote_average }) => (
        <li key={id} className={styles.listItem}>
          <MovieCard
            id={id}
            moveImage={moveImage}
            pathname={pathname}
            voteAverage={vote_average}
            posterPath={poster_path}
            title={title || original_title}
          />
        </li>
      ))}
    </ul>
  ) : null;

export default MovieCards;
