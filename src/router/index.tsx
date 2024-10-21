import App from '@/App';
import { createHashRouter } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          const Table = await import('@/features/table/components/TablePage');
          return { Component: Table.default };
        },
      },
      {
        path: 'chart',
        async lazy() {
          const Chart = await import('@/features/chart/PieChart');
          return { Component: Chart.default };
        },
      },
    ],
  },
]);
export default router;
