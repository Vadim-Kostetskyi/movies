import { Routes, Route, Outlet } from 'react-router-dom';
// import { NavLink, Route, Routes } from 'react-router-dom';
// import { PATHS } from 'constants';
import { Header } from 'elements/Header';
import DayFilm from 'elements/DayFilm';
import { Suspense } from 'react';
import Movie2 from 'elements/Movie2';
import Movie from 'elements/Movie';
import Actors from 'elements/Actors';
import Reviews from 'elements/Reviews';

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
