import { NavLink, Outlet } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <nav className="nav">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" to="/movies">
          Movies
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};
