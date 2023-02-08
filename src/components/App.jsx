import { Routes, Route, Outlet } from 'react-router-dom';
import { Header } from 'elements/Header';
import DayFilm from 'elements/DayFilm';
import { Suspense, lazy } from 'react';
// import Movie2 from 'elements/Movie2';
// import Movie from 'elements/Movie';
// import Actors from 'elements/Actors';
// import Reviews from 'elements/Reviews';

const Movie = lazy(() => import('elements/Movie'));
const Actors = lazy(() => import('elements/Actors'));
const Reviews = lazy(() => import('elements/Reviews'));
const Movie2 = lazy(() => import('elements/Movie2'));

export const App = () => {
  return (
    <div>
      <Suspense fallback="Loading..">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<DayFilm />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/movies/:movieId" element={<Movie2 />}>
              <Route path="cast" element={<Actors />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};
