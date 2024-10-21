import { useEffect } from 'react';

import { request } from '@/store/features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Outlet } from 'react-router-dom';

import Progress from '@/features/common/components/Progress';
import ToastNotifications from './features/toastNotifications/ToastNotifications';
import Layout from './features/common/components/Layout';

function App() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.characters.loading);
  useEffect(() => {
    dispatch(request());
  }, [dispatch]);

  return (
    <Layout>
      <>
        {loading && <Progress />}
        <Outlet />
        <ToastNotifications />
      </>
    </Layout>
  );
}

export default App;
