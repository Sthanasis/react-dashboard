import { useEffect } from 'react';

import { request } from '@/store/features/characters/charactersSlice';
import { useAppDispatch } from '@/store/hooks';

import { Outlet, NavLink, useNavigation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faDashboard } from '@fortawesome/free-solid-svg-icons';

function App() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    dispatch(request());
  }, []);

  const linkClasses = (isActive: boolean) => {
    const classes =
      'cursor-pointer p-2  flex items-center gap-2 justify-between';
    return isActive ? classes.concat(' bg-primary text-white') : classes;
  };

  return (
    <div className="w-screen h-screen md:flex">
      <div className="fixed top-0 right-0">
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
      </div>
      <nav className="flex md:flex-col md:h-full bg-snow-white border border-r-gray-300 border-solid">
        <h1 className="p-4 pl-2 text-lg font-bold">Dashboard</h1>
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
      <div className="p-5 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
