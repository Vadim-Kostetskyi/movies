import { Routes, Route } from 'react-router-dom';
import { Header } from 'components/Header';
import DayFilm from 'pages/DayFilm';
import { Suspense, lazy } from 'react';

const SearchMovie = lazy(() => import('pages/SearchMovie'));
const Actors = lazy(() => import('components/Actors'));
const Reviews = lazy(() => import('components/Reviews'));
const MovieInfo = lazy(() => import('components/MovieInfo'));

export const App = () => {
  return (
    <div>
      <Suspense fallback="Loading..">
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<DayFilm />} />
            <Route path="/searchMovie" element={<SearchMovie />} />
            <Route path="/searchMovie/:movieId" element={<MovieInfo />}>
              <Route path="cast" element={<Actors />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};
