import { getMovieById } from 'constants/dafaultApi';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom';
import Actors from './Actors';

const Movie2 = () => {
  const [title, setTitle] = useState([]);
  const [overview, setOverview] = useState([]);
  const [genres, setGenres] = useState([]);
  const [vote_average, setVote_average] = useState([]);
  const [img, setImg] = useState([]);

  const userScore = parseInt(vote_average) * 10;

  const { movieId } = useParams();

  useEffect(() => {
    getMovieById(movieId).then(({ data }) => {
      setTitle(data.title);
      setOverview(data.overview);
      setGenres(data.genres);
      setVote_average(data.vote_average);
      setImg(data.poster_path);
    });
  }, []);

  let navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button onClick={goBack}>Go back</button>
      <div className="movie">
        <img
          className="movie-img"
          src={`https://image.tmdb.org/t/p/w500/${img}`}
          alt={title}
          width="200px"
        />
        <div>
          <h1>{title}</h1>
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
