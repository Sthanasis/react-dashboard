import { Filter } from '@/enums/Filter';
import { SortingOrder } from '@/table/enums/sortingOrder';
import { Column } from '@/table/types/column';
import { mapTableRows } from '@/utilities/mapTableRows';
import { sortByName } from '@/utilities/sortByName';
import { ApiResponse } from '@/types/apiResponse';
import { CharacterKey } from '@/types/character';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharactersState } from '@/types/characterState';

export const columns: Column<CharacterKey>[] = [
  { id: 'name', value: 'Name', sortingOrder: SortingOrder.default },
  {
    id: 'participatingShows',
    value: 'TV Shows',
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

export const initialState: CharactersState = {
  data: [],
  search: '',
  loading: false,
  filterOptions: [
    { value: Filter.name, label: 'Name' },
    { value: Filter.show, label: 'Show' },
    { value: null, label: 'None' },
  ],
  activeFilter: null,
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
      state.data = action.payload.data;
      state.paginationOptions.pageSize = action.payload.info.count;
      state.paginationOptions.totalPages = action.payload.info.totalPages;
    },
    setCharacters(state, action: PayloadAction<ApiResponse>) {
      state.data = action.payload.data;
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
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSortingOrder(state, action: PayloadAction<SortingOrder>) {
      state.order = action.payload;
    },
    setCharacterData(state, action: PayloadAction<DisneyCharacter | null>) {
      const character = action.payload;
      state.characterData = character
        ? {
            name: character.name,
            image: character.imageUrl,
            tvShows: character.tvShows,
            videoGames: character.videoGames,
          }
        : null;
    },
    setCharacterId(state, action: PayloadAction<number | null>) {
      state.characterId = action.payload;
    },
    setActiveFilter(state, action: PayloadAction<Filter | null>) {
      state.activeFilter = action.payload;
    },
    searchByFilter() {},
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  selectors: {
    selectRows: createSelector(
      (state: CharactersState) => state.data,
      (state: CharactersState) => state.order,
      (data, order) => {
        const tableRows = mapTableRows(data, columns);
        if (order !== SortingOrder.default) sortByName(tableRows, order);
        return tableRows;
      }
    ),
    selectColumns: createSelector(
      (state: CharactersState) => state.order,
      (order) =>
        columns.map((column) =>
          column.id === 'name' ? { ...column, sortingOrder: order } : column
        )
    ),
    selectPaginationOptions: (state) => state.paginationOptions,
    selectSearch: (state) => state.search,
    selectCharacterData: (state) => state.characterData,
    selectData: (state) => state.data,
    selectFilterOptions: (state) => state.filterOptions,
    selectActiveFilter: (state) => state.activeFilter,
  },
});

export const {
  setCharacters,
  request,
  setPaginationOptions,
  setInitialData,
  setTotalPages,
  setSearch,
  setSortingOrder,
  setCharacterData,
  setCharacterId,
  setActiveFilter,
  searchByFilter,
  setLoading,
} = charactersSlice.actions;

export const {
  selectRows,
  selectColumns,
  selectPaginationOptions,
  selectSearch,
  selectCharacterData,
  selectData,
  selectFilterOptions,
  selectActiveFilter,
} = charactersSlice.selectors;

export default charactersSlice.reducer;
