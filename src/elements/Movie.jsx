import { useEffect, useState, useRef } from 'react';
import {
  Outlet,
  Link,
  useSearchParams,
  useLocation,
  // navigate,
} from 'react-router-dom';
import { getMovieByName } from 'constants/dafaultApi';
import lupa from './lupa.png';

const Movie = () => {
  const [imageNameInput, setImageNameInput] = useState('');
  const [films, setFilms] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const boxRef = useRef(null);

  const scrollToHeader = () => {
    console.log(boxRef.current);
  };

  const location = useLocation();
  const fromQueryString = location.search.replace(/\?query=/, '');

  // const path = document.location.href.length;

  const inputChange = el => {
    const { value } = el.currentTarget;
    setImageNameInput(value.toLowerCase());
  };

  useEffect(() => {
    if (fromQueryString) {
      getMovieByName(fromQueryString).then(el => {
        setFilms(el.data.results);
      });
    }
  }, []);

  const handleSubmit = el => {
    el.preventDefault();

    if (imageNameInput) {
      getMovieByName(imageNameInput).then(el => {
        console.log(el);
        setFilms(el.data.results);
      });
      setSearchParams({ query: imageNameInput });
      setImageNameInput('');

      scrollToHeader();

      boxRef.current.classList.add('input-box');
    }
  };

  async function moveImage(el) {
    el.preventDefault();
    // console.log(el.target.offsetTop);
    // console.log(el.target.offsetLeft);
    // console.log(window.innerHeight);
    console.log(el.currentTarget.href);
    // const nextUrl = el.currentTarget.href;
    // const response = await fetch(nextUrl);
    // console.log(response.text());
    // const html = await response.text();
    // console.log(response.url);
    // const prefetchNextPage = usePrefetch('/next-page');

    const top = el.target.offsetTop;
    const left = el.target.offsetLeft;
    const rect = el.target.getBoundingClientRect();
    const topOffset = 108.6 - rect.top;
    const leftOffset = 30 - rect.left;

    document.body.style.overflow = 'hidden';

    el.target.style.position = 'relative';

    // el.target.style.transform = `translateY(${topOffset}px)`;
    // el.target.style.transform = `translateX(${leftOffset}px)`;
    el.target.style.transform = `translate(${leftOffset}px, ${topOffset}px)`;

    // el.target.style.transform = `translateX(calc(100vw-${left}px))`;

    // console.log('top:', rect.top);
    //   console.log('left:', rect.left);
    //   console.log('bottom:', rect.bottom);
    //   console.log('right:', rect.right);
    //   console.log('width:', rect.width);
    //   console.log('height:', rect.height);
    // setTimeout(() => {
    //   window.location.href = e.currentTarget.href;
    // }, 500); // перехід через 500 мс
    setTimeout(() => {
      // window.location.href = el.currentTarget.getAttribute('to');
      // window.location.href = response.url;
      // document.querySelector('html').innerHTML = html;
    }, 1000);
    const nextUrl = el.currentTarget.href;

    // Попереднє завантаження сторінки за допомогою fetch
    const response = await fetch(nextUrl);
    //   setTimeout(() => {
    //     console.log(data);
    //     console.log(nextUrl);
    //   }, 1000);
    // });
    const html = await response.text();
    await new Promise(resolve =>
      setTimeout(() => {
        resolve();
      }, 1000)
    );
    window.location.href = response.url;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="box" ref={boxRef}>
          <input
            className="input"
            type="text"
            onChange={inputChange}
            value={imageNameInput}
            placeholder="Search"
          />
          <button className="search-btn" type="submit">
            <img className="search-img" src={lupa} alt="" />
          </button>
        </div>
      </form>
      {films.length > 0 && (
        <ul className="day-list">
          {films.map(({ original_title, id, poster_path }) => (
            <li key={id} className="day-list-item">
              <Link
                onClick={moveImage}
                className="day-link"
                state={`${location.pathname}${location.search}`}
                rel="prefetch"
                href={`/movies/${id}`}
                to={`/movies/${id}`}
              >
                <span className="day-text">{original_title}</span>
                <div className="img-box">
                  <img
                    className="img"
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt=""
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default Movie;
