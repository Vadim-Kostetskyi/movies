import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'API/dafaultApi';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getReviews(movieId).then(el => setReviews(el.data.results));
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 && (
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <h3>Author: {author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 ? (
        <p>We don`t have any reviews for this movie</p>
      ) : null}
    </>
  );
};
export default Reviews;
