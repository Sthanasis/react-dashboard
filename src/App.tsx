import { useEffect } from 'react';
import Pagination from '@/table/components/Pagination';
import Table from '@/table/components/Table';
import {
  request,
  selectColumns,
  selectPaginationOptions,
  selectRows,
  setPaginationOptions,
} from '@/store/features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

function App() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => selectRows(state));
  const cols = useAppSelector((state) => selectColumns(state));
  const paginationOptions = useAppSelector((state) =>
    selectPaginationOptions(state)
  );

  const isVirtual = paginationOptions.pageSize > 100;

  useEffect(() => {
    dispatch(request());
  }, []);

  return (
    <div className="w-screen h-screen">
      <Table
        rows={rows}
        columns={cols}
        rowHeight={50}
        isVirtual={isVirtual}
        footer={
          <Pagination
            label={'Rows per page:'}
            page={paginationOptions.currentPage}
            pageSize={paginationOptions.pageSize}
            total={paginationOptions.totalPages}
            rowsPerPageOptions={paginationOptions.totalPerPage}
            onPageChange={(page) =>
              dispatch(
                setPaginationOptions({
                  page,
                  pageSize: paginationOptions.pageSize,
                })
              )
            }
            onRowsPerPageChange={(pageSize) =>
              dispatch(
                setPaginationOptions({
                  pageSize,
                  page: 1,
                })
              )
            }
          />
        }
      />
    </div>
  );
}

export default App;
