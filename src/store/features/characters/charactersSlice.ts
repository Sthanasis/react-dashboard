import { SortingOrder } from '@/table/enums/sortingOrder';
import { Column } from '@/table/types/column';
import { Row } from '@/table/types/row';
import { ApiResponse } from '@/types/apiResponse';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Character = {
  name: string;
  participatingShows: number;
  participatingVideoGames: number;
  allies: number;
  enemies: string;
};

type CharacterKey = keyof Character;

const columns: Column<CharacterKey>[] = [
  { id: 'name', value: 'Name', sortingOrder: SortingOrder.default },
  {
    id: 'participatingShows',
    value: 'Shows',
    sortingOrder: SortingOrder.default,
  },
  {
    id: 'participatingVideoGames',
    value: 'Video Games',
    sortingOrder: SortingOrder.default,
  },
  { id: 'allies', value: 'Allies', sortingOrder: SortingOrder.default },
  {
    id: 'enemies',
    value: 'Enemies',
    sortingOrder: SortingOrder.default,
  },
];

type PaginationOptions = {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  totalPerPage: number[];
  nextPage: string | null;
  previousPage: string | null;
};

export interface CharactersState {
  loading: boolean;
  characters: Row<CharacterKey>[];
  tableColumns: Column<CharacterKey>[];
  paginationOptions: PaginationOptions;
}

const initialState: CharactersState = {
  loading: false,
  characters: [],
  tableColumns: columns,
  paginationOptions: {
    pageSize: 0,
    currentPage: 1,
    totalPages: 0,
    totalPerPage: [10, 20, 50, 100, 200, 500],
    nextPage: null,
    previousPage: null,
  },
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    setCharacters(state, action: PayloadAction<ApiResponse>) {
      state.characters = action.payload.data
        .map((character) => ({
          id: character._id,
          name: character.name,
          participatingShows: character.tvShows.length,
          participatingVideoGames: character.videoGames.length,
          allies: character.allies.join(', '),
          enemies: character.enemies.join(', '),
        }))
        .map((item) => ({
          id: item.id,
          items: state.tableColumns.map((column) => ({
            name: column.id,
            value: item[column.id],
          })),
        }));
      state.paginationOptions.pageSize = action.payload.info.count;
      state.paginationOptions.totalPages = action.payload.info.totalPages;
    },
    setPaginationOptions(
      state,
      action: PayloadAction<{
        page: number;
        pageSize: number;
      }>
    ) {
      state.paginationOptions.currentPage = action.payload.page;
      state.paginationOptions.pageSize = action.payload.pageSize;
    },
  },
  selectors: {
    selectCharacters: (state) => state.characters,
    selectRows: (state) => state.characters,
    selectColumns: (state) => state.tableColumns,
    selectPaginationOptions: (state) => state.paginationOptions,
  },
});

export const { setCharacters, request, setPaginationOptions } =
  charactersSlice.actions;

export const { selectRows, selectColumns, selectPaginationOptions } =
  charactersSlice.selectors;
export default charactersSlice.reducer;
