import { getMovieById } from 'constants/dafaultApi';
import { useEffect, useState } from 'react';
import {
  Link,
  useParams,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
// import Actors from './Actors';

const Movie2 = () => {
  const [title, setTitle] = useState('');
  const [overview, setOverview] = useState('');
  const [genres, setGenres] = useState([]);
  const [vote_average, setVote_average] = useState([]);
  const [img, setImg] = useState('');
  const [oldPath, setOldPath] = useState('');
  const [date, setDate] = useState(0);

  const userScore = parseInt(vote_average) * 10;

  const { movieId } = useParams();

  const location = useLocation();

  useEffect(() => {
    getMovieById(movieId).then(({ data }) => {
      setDate(data.release_date.slice(0, 4));
      setTitle(data.title);
      setOverview(data.overview);
      setGenres(data.genres);
      setVote_average(data.vote_average);
      setImg(data.poster_path);
    });
    setOldPath(location.state);
  }, []);

  let navigate = useNavigate();

  const goBack = () => {
    navigate(oldPath);
  };

  return (
    <>
      <button onClick={goBack}>Go back</button>
      <div className="movie">
        <img
          className="movie-img"
          src={img ? `https://image.tmdb.org/t/p/w500/${img}` : ''}
          alt={title}
          width="200px"
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
              <span className="geners" key={el.id}>
                {el.name}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="movie-box">
        <p>Additional Information</p>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Movie2;
