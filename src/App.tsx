import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/table/components/Pagination';
import Table from '@/table/components/Table';
import {
  request,
  selectColumns,
  selectPaginationOptions,
  selectRows,
  setPaginationOptions,
  setSearchedName,
} from '@/store/features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import Search from './table/components/Search';

function App() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(selectRows);
  const cols = useAppSelector(selectColumns);
  const { currentPage, pageSize, totalPages, totalPerPage } = useAppSelector(
    selectPaginationOptions
  );

  const [debounce, setDebounce] = useState<ReturnType<typeof setTimeout>>();
  const isVirtual = rows.length >= 100;

  useEffect(() => {
    dispatch(request());
  }, []);

  const totalRows = useMemo(
    () => totalPages * pageSize,
    [totalPages, pageSize]
  );

  function handleSearch(name: string) {
    if (debounce) clearTimeout(debounce);
    setDebounce(
      setTimeout(() => {
        dispatch(setSearchedName(name));
      }, 500)
    );
  }
  return (
    <div className="w-screen h-screen">
      <Table
        rows={rows}
        columns={cols}
        rowHeight={50}
        isVirtual={isVirtual}
        header={
          <div className="flex">
            <Search
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        }
        footer={
          <Pagination
            label="Rows per page:"
            page={currentPage}
            pageSize={pageSize}
            total={totalRows}
            rowsPerPageOptions={totalPerPage}
            onPageChange={(page) =>
              dispatch(
                setPaginationOptions({
                  page,
                  pageSize: pageSize,
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
