import { Link } from 'react-router-dom';
import { PathById } from 'API';
import { PathToImage } from 'API';
import styles from './index.module.css';

const MovieCard = ({
  id,
  moveImage,
  pathname,
  voteAverage,
  posterPath,
  title,
}) => (
  <Link
    className={styles.link}
    onClick={moveImage}
    state={pathname}
    rel="prefetch"
    href={PathById(id).info}
    to={PathById(id).info}
  >
    <div className={styles.imageBox}>
      <div className={styles.vote}>{voteAverage.toFixed(1)}</div>
      <div className="image-box-backdrop"></div>
      <img className={styles.image} src={PathToImage(posterPath)} alt={title} />
    </div>
    <span className={styles.title}>{title}</span>
  </Link>
);

export default MovieCard;
