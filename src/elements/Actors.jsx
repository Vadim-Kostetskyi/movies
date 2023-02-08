import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActors } from 'constants/dafaultApi';

const Actors = () => {
  const [actors, setActors] = useState([]);

  const { movieId } = useParams();
  useEffect(() => {
    getActors(movieId).then(el => setActors(el.data.cast));
  }, []);
  //   console.log(actors);
  return (
    <ul>
      {actors.map(({ original_name, character, id, profile_path }) => (
        <li key={id}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            alt={original_name}
            width="100px"
          />
          <h2>{original_name}</h2>
          <p>`Character: {character}`</p>
        </li>
      ))}
    </ul>
  );
};

export default Actors;
