import { useEffect, useMemo, useState } from 'react';
import Pagination from '@/table/components/Pagination';
import Table from '@/table/components/Table';
import {
  request,
  searchByFilter,
  selectActiveFilter,
  selectCharacterData,
  selectColumns,
  selectFilterOptions,
  selectPaginationOptions,
  selectRows,
  setActiveFilter,
  setCharacterData,
  setCharacterId,
  setPaginationOptions,
  setSearch,
  setSortingOrder,
} from '@/store/features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getNextOrder } from './table/utilities/getNextOrder';
import Modal from './common/components/Modal';
import CharacterInfo from './table/components/CharacterInfo';
import PieChart from './chart/PieChart';
import Form from './table/components/Form';
import Button from './common/components/Button';

function App() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(selectRows);
  const cols = useAppSelector(selectColumns);
  const { currentPage, pageSize, totalPages, totalPerPage } = useAppSelector(
    selectPaginationOptions
  );
  const characterData = useAppSelector(selectCharacterData);
  const filterOptions = useAppSelector(selectFilterOptions);
  const activeFilter = useAppSelector(selectActiveFilter);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const isVirtual = rows.length >= 100;

  const totalRows = useMemo(
    () => totalPages * pageSize,
    [totalPages, pageSize]
  );

  useEffect(() => {
    dispatch(request());
  }, []);

  function handleSearch(name: string) {
    dispatch(setSearch(name));
  }

  function handleSubmit() {
    setIsFormVisible(false);
    dispatch(searchByFilter());
  }
  return (
    <div className="w-screen h-screen p-2">
      <Table
        rows={rows}
        columns={cols}
        rowHeight={50}
        isVirtual={isVirtual}
        onSortByName={(order) => dispatch(setSortingOrder(getNextOrder(order)))}
        onSelectRow={(id) => dispatch(setCharacterId(id))}
        header={
          <Button
            variant="text"
            color="primary"
            onClick={() => setIsFormVisible(true)}
          >
            {'Search'}
          </Button>
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
      <Modal
        isOpen={!!characterData}
        onClose={() => dispatch(setCharacterData(null))}
      >
        {characterData && (
          <CharacterInfo
            emptyMessage="no data"
            showTitle="Shows"
            videoGameTitle="Video Games"
            character={characterData}
          />
        )}
      </Modal>
      <Modal
        isOpen={!!isFormVisible}
        onClose={() => setIsFormVisible(false)}
      >
        <Form
          title="Search Disney Character"
          submitText="Submit"
          selectedRadio={activeFilter}
          radioOptions={filterOptions}
          onCheck={(filter) => dispatch(setActiveFilter(filter))}
          onChange={handleSearch}
          onSubmit={handleSubmit}
        />
      </Modal>
      <PieChart />
    </div>
  );
}

export default App;
