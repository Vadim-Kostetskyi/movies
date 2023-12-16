import { Link } from 'react-router-dom';
import { PathById } from 'API';
import styles from './index.module.css';

const MovieCard = ({
  id,
  moveImage,
  pathname,
  search,
  voteAverage,
  posterPath,
  title,
}) => {
  return (
    <Link
      className={styles.link}
      onClick={moveImage}
      state={`${pathname}${search}`}
      rel="prefetch"
      href={PathById(id).info}
      to={PathById(id).info}
    >
      <div className={styles.imageBox}>
        <div className={styles.vote}>{voteAverage.toFixed(1)}</div>
        <div className="image-box-backdrop"></div>
        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt=""
        />
      </div>
      <span className="day-text">{title}</span>
    </Link>
  );
};

export default MovieCard;
