import App from '@/App';
import { createBrowserRouter } from 'react-router-dom';

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        async lazy() {
          const Table = await import('@/table/components/TablePage');
          return { Component: Table.default };
        },
      },
      {
        path: 'chart',
        async lazy() {
          const Chart = await import('@/chart/PieChart');
          return { Component: Chart.default };
        },
      },
    ],
  },
]);
