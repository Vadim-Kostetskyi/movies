import { getReviews } from 'constants/dafaultApi';

const { useEffect, useState } = require('react');
const { useParams } = require('react-router-dom');

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    getReviews(movieId).then(el => setReviews(el.data.results));
  }, []);
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
      {reviews.length === 0 && <p>We don`t have any reviews for this movie</p>}{' '}
    </>
  );
};
export default Reviews;
