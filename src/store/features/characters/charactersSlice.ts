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
  },
  {
    id: 'participatingVideoGames',
    value: 'Video Games',
  },
  { id: 'allies', value: 'Allies' },
  {
    id: 'enemies',
    value: 'Enemies',
  },
];

export type PaginationOptions = {
  pageSize: number;
  totalPages: number;
  currentPage: number;
  totalPerPage: number[];
};

export interface CharactersState {
  searchedName: string;
  loading: boolean;
  characters: Row<CharacterKey>[];
  tableColumns: Column<CharacterKey>[];
  paginationOptions: PaginationOptions;
}

const initialState: CharactersState = {
  searchedName: '',
  loading: false,
  characters: [],
  tableColumns: columns,
  paginationOptions: {
    pageSize: 0,
    currentPage: 1,
    totalPages: 0,
    totalPerPage: [10, 20, 50, 100, 200, 500],
  },
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    setInitialData(state, action: PayloadAction<ApiResponse>) {
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
    setTotalPages(state, action: PayloadAction<number>) {
      state.paginationOptions.totalPages = action.payload;
    },
    setSearchedName(state, action: PayloadAction<string>) {
      state.searchedName = action.payload;
    },
  },
  selectors: {
    selectCharacters: (state) => state.characters,
    selectRows: (state) => state.characters,
    selectColumns: (state) => state.tableColumns,
    selectPaginationOptions: (state) => state.paginationOptions,
    selectSearchedName: (state) => state.searchedName,
  },
});

export const {
  setCharacters,
  request,
  setPaginationOptions,
  setInitialData,
  setTotalPages,
  setSearchedName,
} = charactersSlice.actions;

export const {
  selectRows,
  selectColumns,
  selectPaginationOptions,
  selectSearchedName,
} = charactersSlice.selectors;
export default charactersSlice.reducer;
