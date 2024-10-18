import Pagination from './table/components/Pagination';
import Table from './table/components/Table';
import { SortingOrder } from './table/enums/sortingOrder';
import { Column } from './table/types/column';
import { Row } from './table/types/row';

const cols: Column[] = [
  { name: '0', sortingOrder: SortingOrder.default, value: 'text' },
  { name: '1', sortingOrder: SortingOrder.default, value: 'text 1' },
  { name: '2', sortingOrder: SortingOrder.default, value: 'text 2' },
  { name: '3', sortingOrder: SortingOrder.default, value: 'text 3' },
  { name: '4', sortingOrder: SortingOrder.default, value: 'text 4' },
];

const rows: Row[] = Array.from(new Array(100), (v, k) => ({
  id: k,
  items: [
    { name: '0', value: 'test' + k },
    { name: '1', value: 'test' + k },
    { name: '2', value: 'test' + k },
    { name: '3', value: 'test' + k },
    { name: '4', value: 'test' + k },
  ],
}));
function App() {
  return (
    <div className="w-screen">
      <Table
        rows={rows}
        columns={cols}
        rowHeight={50}
        header={<div>Header</div>}
        footer={
          <Pagination
            label={'Rows per page:'}
            page={0}
            pageSize={50}
            total={40}
            rowsPerPageOptions={[5, 10, 20]}
            onPageChange={() => {}}
            onRowsPerPageChange={() => {}}
          />
        }
      />
    </div>
  );
}

export default App;
