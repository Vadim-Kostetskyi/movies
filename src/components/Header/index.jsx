import { NavLink, Outlet } from 'react-router-dom';
import { Path } from 'API';
import styles from './index.module.css';

export const Header = () => (
  <div>
    <nav className={styles.box}>
      <NavLink className={styles.link} to={Path.home}>
        DayFilms
      </NavLink>
      <NavLink className={styles.link} to={Path.searchMovie}>
        Search movie
      </NavLink>
    </nav>
    <Outlet />
  </div>
);
