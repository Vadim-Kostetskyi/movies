import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActors } from 'API/dafaultApi';
import { PathToImage } from 'API';

const Actors = () => {
  const [actors, setActors] = useState([]);

  const { movieId } = useParams();
  useEffect(() => {
    getActors(movieId).then(el => setActors(el.data.cast));
  }, []);

  return (
    <ul>
      {actors.map(({ original_name, character, id, profile_path }) => (
        <li key={id}>
          <img
            src={profile_path ? PathToImage(profile_path) : ''}
            alt={original_name}
          />
          <h2>{original_name}</h2>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Actors;
