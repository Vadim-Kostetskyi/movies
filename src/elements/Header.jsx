import { NavLink, Outlet } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <nav className="nav">
        <NavLink className="nav-link" to="/">
          DayFilms
        </NavLink>
        <NavLink className="nav-link" to="/movies">
          Search movie
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
