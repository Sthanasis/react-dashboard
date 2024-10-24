import { useMemo, useState } from 'react';
import Pagination from '@/features/table/components/Pagination';
import Table from '@/features/table/components/Table';
import {
  searchByFilter,
  selectActiveFilter,
  selectCharacterData,
  selectColumns,
  selectFilterOptions,
  selectPaginationOptions,
  selectRows,
  selectSearch,
  setActiveFilter,
  setCharacterData,
  setCharacterId,
  setPaginationOptions,
  setSearch,
  setSortingOrder,
} from '@/store/features/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getNextOrder } from '@/features/table/utilities/getNextOrder';
import Modal from '@/features/common/components/Modal';
import CharacterInfo from '@/features/table/components/CharacterInfo';
import Form from '@/features/table/components/Form';
import Button from '@/features/common/components/Button';

function TablePage() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector(selectRows);
  const cols = useAppSelector(selectColumns);
  const { currentPage, pageSize, totalPages, totalPerPage } = useAppSelector(
    selectPaginationOptions
  );
  const characterData = useAppSelector(selectCharacterData);
  const filterOptions = useAppSelector(selectFilterOptions);
  const activeFilter = useAppSelector(selectActiveFilter);
  const search = useAppSelector(selectSearch);
  const loading = useAppSelector((state) => state.characters.loading);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const isVirtual = rows.length >= 100;

  const totalRows = useMemo(
    () => totalPages * pageSize,
    [totalPages, pageSize]
  );

  function handleSearch(name: string) {
    dispatch(setSearch(name));
  }

  function handleSubmit() {
    setIsFormVisible(false);
    dispatch(searchByFilter());
  }

  const startIndicator = pageSize * (currentPage - 1) + 1;
  let endIndicator = pageSize * currentPage;
  endIndicator = totalRows < endIndicator ? totalRows : endIndicator;
  const pageIndicator = `${startIndicator} - ${endIndicator} / ${totalRows}`;

  return (
    <>
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
            pageIndicator={!loading ? pageIndicator : ''}
            disabledStart={currentPage === 1}
            disabledEnd={endIndicator === totalRows}
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
          searchValue={search}
          selectedRadio={activeFilter}
          radioOptions={filterOptions}
          onCheck={(filter) => dispatch(setActiveFilter(filter))}
          onChange={handleSearch}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}

export default TablePage;
