import { SortingOrder } from '@/table/enums/sortingOrder';
import reducer, {
  initialState,
  request,
  setInitialData,
  setCharacters,
  setPaginationOptions,
  setTotalPages,
  setSearch,
  setSortingOrder,
  setCharacterData,
  setCharacterId,
  searchByFilter,
  setActiveFilter,
  selectRows,
  selectColumns,
  columns,
  selectPaginationOptions,
  selectSearch,
  selectCharacterData,
  selectData,
  selectFilterOptions,
  selectActiveFilter,
} from './charactersSlice';
import { MOCK_API_RESPONSE } from '@/mocks/mockApiResponse';
import { Filter } from '@/enums/Filter';
import * as rowsMapper from '@/utilities/mapTableRows';
import * as sorter from '@/utilities/sortByName';
describe('Characters slice', () => {
  describe('actions', () => {
    test('request', () => {
      const result = reducer(initialState, request());
      expect(result).toMatchObject({ ...initialState, loading: true });
    });
    test('setInitialData', () => {
      const result = reducer(initialState, setInitialData(MOCK_API_RESPONSE));
      expect(result).toMatchObject({
        ...initialState,
        data: MOCK_API_RESPONSE.data,
        paginationOptions: {
          ...initialState.paginationOptions,
          pageSize: MOCK_API_RESPONSE.info.count,
          totalPages: MOCK_API_RESPONSE.info.totalPages,
        },
      });
    });
    test('setCharacters', () => {
      const result = reducer(initialState, setCharacters(MOCK_API_RESPONSE));
      expect(result).toMatchObject({
        ...initialState,
        data: MOCK_API_RESPONSE.data,
      });
    });
    test('setPaginationOptions', () => {
      const mockPayload = { page: 1, pageSize: 10 };
      const result = reducer(initialState, setPaginationOptions(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        paginationOptions: {
          ...initialState.paginationOptions,
          currentPage: mockPayload.page,
          pageSize: mockPayload.pageSize,
        },
      });
    });
    test('setTotalPages', () => {
      const mockPayload = 10;
      const result = reducer(initialState, setTotalPages(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        paginationOptions: {
          ...initialState.paginationOptions,
          totalPages: mockPayload,
        },
      });
    });
    test('setSearch', () => {
      const mockPayload = 'test search';
      const result = reducer(initialState, setSearch(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        search: mockPayload,
      });
    });
    test('setSortingOrder', () => {
      const mockPayload = SortingOrder.asc;
      const result = reducer(initialState, setSortingOrder(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        order: mockPayload,
      });
    });
    test('setCharacterData', () => {
      const mockPayload = MOCK_API_RESPONSE.data[0];
      let result = reducer(initialState, setCharacterData(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        characterData: {
          name: mockPayload.name,
          image: mockPayload.imageUrl,
          tvShows: mockPayload.tvShows,
          videoGames: mockPayload.videoGames,
        },
      });
      result = reducer(initialState, setCharacterData(null));
      expect(result).toMatchObject({
        ...initialState,
        characterData: null,
      });
    });
    test('setCharacterId', () => {
      const mockPayload = 1;
      const result = reducer(initialState, setCharacterId(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        characterId: mockPayload,
      });
    });
    test('setActiveFilter', () => {
      const mockPayload = Filter.name;
      let result = reducer(initialState, setActiveFilter(mockPayload));
      expect(result).toMatchObject({
        ...initialState,
        activeFilter: mockPayload,
      });
      result = reducer(initialState, setActiveFilter(null));
      expect(result).toMatchObject({
        ...initialState,
        activeFilter: null,
      });
    });
    test('setActiveFilter', () => {
      const result = reducer(initialState, searchByFilter());
      expect(result).toMatchObject(initialState);
    });
  });
  describe('selectors', () => {
    test('selectRows', () => {
      const mapperSpy = vi.spyOn(rowsMapper, 'mapTableRows');
      const sorterSpy = vi.spyOn(sorter, 'sortByName');
      const initial = { ...initialState, data: MOCK_API_RESPONSE.data };
      let state = {
        characters: initial,
      };
      selectRows(state);
      expect(mapperSpy).toHaveBeenCalledOnce();
      expect(sorterSpy).not.toHaveBeenCalled();
      state = {
        characters: { ...initial, order: SortingOrder.asc },
      };
      selectRows(state);
      expect(mapperSpy).toHaveBeenCalledTimes(2);
      expect(sorterSpy).toHaveBeenCalledOnce();
    });
    test('selectColumns', () => {
      let state = {
        characters: initialState,
      };
      let result = selectColumns(state);
      expect(result).toMatchObject(columns);
      state = {
        characters: { ...initialState, order: SortingOrder.asc },
      };
      result = selectColumns(state);
      expect(result).toMatchObject(
        columns.map((column) =>
          column.id === 'name'
            ? { ...column, sortingOrder: SortingOrder.asc }
            : column
        )
      );
    });
    test('selectPaginationOptions', () => {
      const state = {
        characters: initialState,
      };
      expect(selectPaginationOptions(state)).toMatchObject(
        state.characters.paginationOptions
      );
    });
    test('selectSearch', () => {
      const state = {
        characters: initialState,
      };
      expect(selectSearch(state)).toBe(state.characters.search);
    });
    test('selectCharacterData', () => {
      const state = {
        characters: initialState,
      };
      expect(selectCharacterData(state)).toEqual(
        state.characters.characterData
      );
    });
    test('selectData', () => {
      const state = {
        characters: initialState,
      };
      expect(selectData(state)).toMatchObject(state.characters.data);
    });
    test('selectFilterOptions', () => {
      const state = {
        characters: initialState,
      };
      expect(selectFilterOptions(state)).toMatchObject(
        state.characters.filterOptions
      );
    });
    test('selectActiveFilter', () => {
      const state = {
        characters: initialState,
      };
      expect(selectActiveFilter(state)).toBe(state.characters.activeFilter);
    });
  });
});
