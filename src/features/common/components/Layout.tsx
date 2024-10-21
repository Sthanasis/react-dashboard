import { faDashboard, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
  const linkClasses = (isActive: boolean) => {
    const classes =
      'cursor-pointer p-2 h-full flex items-center gap-2 justify-between';
    return isActive ? classes.concat(' bg-primary text-white') : classes;
  };
  return (
    <div className="w-screen h-screen md:flex">
      <nav className="flex md:flex-col md:h-full bg-snow-white border border-r-gray-300 border-solid">
        <h1 className="p-2 pl-2 text-lg font-bold">Dashboard</h1>
        <ul className="md:py-4 w-full flex md:flex-col justify-end px-3 md:px-0">
          <li>
            <NavLink
              className={({ isActive }) => linkClasses(isActive)}
              to="/"
            >
              <span>Dashboard</span>
              <FontAwesomeIcon icon={faDashboard} />
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => linkClasses(isActive)}
              to="/chart"
            >
              <span>Chart</span>
              <FontAwesomeIcon icon={faChartPie} />
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="w-full p-5 relative">{children}</div>
    </div>
  );
};

export default Layout;
