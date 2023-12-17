import { getMovieById } from 'API/dafaultApi';
import { useEffect, useState } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import { PathById, PathToImage } from 'API';
import styles from './index.module.css';

const MovieInfo = () => {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const [vote_average, setVote_average] = useState([]);
  const [img, setImg] = useState('');
  const [date, setDate] = useState(0);

  const userScore = parseInt(vote_average) * 10;
  const { movieId } = useParams();

  useEffect(() => {
    getMovieById(movieId).then(({ data }) => {
      setDate(data.release_date.slice(0, 4));
      setTitle(data.title);
      setOverview(data.overview);
      setGenres(data.genres);
      setVote_average(data.vote_average);
      setImg(data.poster_path);
    });
  }, [movieId]);

  // const goBack = () => {
  //   navigate(pathname - 1);
  // };

  return (
    <>
      {/* <button onClick={goBack}>Go back</button> */}
      <div className={styles.movie}>
        <img
          className={styles.movieImg}
          src={img ? PathToImage(img) : ''}
          alt={title}
        />
        <div>
          <h1>
            {title} ({date})
          </h1>
          <p>User Score {userScore}%</p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>
            {genres.map(el => (
              <span className={styles.geners} key={el.id}>
                {el.name}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.movieBox}>
        <p>Additional Information</p>
        <ul>
          <li>
            <Link to={PathById(movieId).actors}>Cast</Link>
          </li>
          <li>
            <Link to={PathById(movieId).reviews}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MovieInfo;
