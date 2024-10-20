import { SortingOrder } from '@/table/enums/sortingOrder';
import { Column } from '@/table/types/column';
import { Row } from '@/table/types/row';
import { mapTableRows } from '@/table/utilities/mapTableRows';
import { sortByName } from '@/table/utilities/sortByName';
import { ApiResponse } from '@/types/apiResponse';
import { CharacterKey } from '@/types/character';
import { CharacterPreview } from '@/types/characterPreview';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
  data: DisneyCharacter[];
  searchedName: string;
  loading: boolean;
  characters: Row<CharacterKey>[];
  tableColumns: Column<CharacterKey>[];
  paginationOptions: PaginationOptions;
  order: SortingOrder;
  characterData: CharacterPreview | null;
  characterId: number | null;
}

const initialState: CharactersState = {
  data: [],
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
  order: SortingOrder.default,
  characterData: null,
  characterId: null,
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
    },
    setInitialData(state, action: PayloadAction<ApiResponse>) {
      state.characters = mapTableRows(action.payload.data, state.tableColumns);
      state.data = action.payload.data;
      state.paginationOptions.pageSize = action.payload.info.count;
      state.paginationOptions.totalPages = action.payload.info.totalPages;
    },
    setCharacters(state, action: PayloadAction<ApiResponse>) {
      const characters = mapTableRows(action.payload.data, state.tableColumns);
      state.data = action.payload.data;
      sortByName(characters, state.order);
      state.characters = characters;
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
    setSortingOrder(state, action: PayloadAction<SortingOrder>) {
      state.order = action.payload;
      const result = sortByName<CharacterKey>(state.characters, state.order);
      state.characters = result ?? mapTableRows(state.data, state.tableColumns);
      state.tableColumns = state.tableColumns.map((column) =>
        column.id === 'name'
          ? { ...column, sortingOrder: action.payload }
          : column
      );
    },
    setCharacterData(state, action: PayloadAction<DisneyCharacter | null>) {
      const character = action.payload;
      if (!character) {
        state.characterData = null;
        return;
      }
      state.characterData = {
        name: character.name,
        image: character.imageUrl,
        tvShows: character.tvShows,
        videoGames: character.videoGames,
      };
    },
    setCharacterId(state, action: PayloadAction<number | null>) {
      state.characterId = action.payload;
    },
  },
  selectors: {
    selectCharacters: (state) => state.characters,
    selectRows: (state) => state.characters,
    selectColumns: (state) => state.tableColumns,
    selectPaginationOptions: (state) => state.paginationOptions,
    selectSearchedName: (state) => state.searchedName,
    selectCharacterData: (state) => state.characterData,
  },
});

export const {
  setCharacters,
  request,
  setPaginationOptions,
  setInitialData,
  setTotalPages,
  setSearchedName,
  setSortingOrder,
  setCharacterData,
  setCharacterId,
} = charactersSlice.actions;

export const {
  selectRows,
  selectColumns,
  selectPaginationOptions,
  selectSearchedName,
  selectCharacterData,
} = charactersSlice.selectors;
export default charactersSlice.reducer;
