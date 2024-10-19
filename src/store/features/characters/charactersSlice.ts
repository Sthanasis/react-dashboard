import { Column } from '@/table/types/column';
import { Row } from '@/table/types/row';
import { ApiPaginationInfo } from '@/types/apiPaginationInfo';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Character = {
  name: string;
  participatingShows: number;
  participatingVideoGames: number;
  alliesCount: number;
  enemies: string[];
};

type PaginationOptions = {
  pageCount: number;
  totalPages: number;
  currentPage: number;
  totalPerPage: number[];
};

export interface CharactersState {
  characters: Character[];
  tableRows: Row[];
  tableColumns: Column[];
  paginationOptions: PaginationOptions;
}

const initialState: CharactersState = {
  characters: [],
  tableRows: [],
  tableColumns: [],
  paginationOptions: {
    pageCount: 0,
    currentPage: 1,
    totalPages: 0,
    totalPerPage: [10, 20, 50, 100, 200, 500],
  },
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<DisneyCharacter[]>) => {
      state.characters = action.payload.map((character) => ({
        name: character.name,
        participatingShows: character.tvShows.length,
        participatingVideoGames: character.videoGames.length,
        alliesCount: character.allies.length,
        enemies: character.enemies,
      }));
    },
    setPageCount: (state, action: PayloadAction<ApiPaginationInfo>) => {
      state.paginationOptions.pageCount = action.payload.count;
    },
    setTotalPages: (state, action: PayloadAction<ApiPaginationInfo>) => {
      state.paginationOptions.totalPages = action.payload.totalPages;
    },
  },
  selectors: {},
});

// Action creators are generated for each case reducer function
export const { setCharacters, setPageCount, setTotalPages } =
  charactersSlice.actions;

export default charactersSlice.reducer;
