import charactersService from '@/utilities/charactersService';
import { fetchByCharacterId, fetchByQuery, fetchData } from './characters';
import { call, put, select } from 'redux-saga/effects';
import {
  selectActiveFilter,
  selectPaginationOptions,
  selectSearch,
  setCharacterData,
  setCharacters,
  setInitialData,
  setLoading,
  setTotalPages,
} from '../features/characters/charactersSlice';
import { MOCK_API_RESPONSE } from '@/mocks/mockApiResponse';
import { Filter } from '@/enums/Filter';
import { addNotification } from '../features/notifications/notificationsSlice';
describe('characters saga', () => {
  test('fetchData', () => {
    const gen = fetchData();
    expect(gen.next().value).toMatchObject(
      call(charactersService.fetchAllCharacters)
    );
    expect(gen.next(MOCK_API_RESPONSE).value).toMatchObject(
      put(setInitialData(MOCK_API_RESPONSE))
    );
    expect(gen.next().value).toMatchObject(put(setLoading(false)));
    expect(gen.next().done).toBe(true);
  });
  test('error on fetchData', () => {
    const gen = fetchData();
    expect(gen.next().value).toMatchObject(
      call(charactersService.fetchAllCharacters)
    );
    expect(gen.throw(new Error()).value).toMatchObject(
      put(addNotification({ header: 'Error', content: 'failed to fetch' }))
    );
    expect(gen.next().value).toMatchObject(put(setLoading(false)));
    expect(gen.next().done).toBe(true);
  });

  test('fetchByQuery', () => {
    const pagination = { currentPage: 1, pageSize: 2 };
    const mockQuery = { query: Filter.name, value: 'test' };
    const gen = fetchByQuery();
    expect(gen.next().value).toMatchObject(select(selectPaginationOptions));
    expect(gen.next(pagination).value).toMatchObject(select(selectSearch));
    expect(gen.next(mockQuery.value).value).toMatchObject(
      select(selectActiveFilter)
    );
    expect(gen.next(mockQuery.query).value).toMatchObject(
      put(setLoading(true))
    );
    expect(gen.next().value).toMatchObject(
      call(
        charactersService.fetchAllCharactersByQuery,
        pagination.currentPage,
        pagination.pageSize,
        mockQuery
      )
    );
    expect(gen.next(MOCK_API_RESPONSE).value).toMatchObject(
      put(setCharacters(MOCK_API_RESPONSE))
    );
    expect(gen.next().value).toMatchObject(
      put(setTotalPages(MOCK_API_RESPONSE.info.totalPages))
    );
    expect(gen.next().value).toMatchObject(put(setLoading(false)));

    expect(gen.next().done).toBe(true);
  });
  test('error on fetchByQuery', () => {
    const pagination = { currentPage: 1, pageSize: 2 };
    const mockQuery = { query: Filter.name, value: 'test' };
    const gen = fetchByQuery();
    expect(gen.next().value).toMatchObject(select(selectPaginationOptions));
    expect(gen.next(pagination).value).toMatchObject(select(selectSearch));
    expect(gen.next(mockQuery.value).value).toMatchObject(
      select(selectActiveFilter)
    );
    expect(gen.next(mockQuery.query).value).toMatchObject(
      put(setLoading(true))
    );
    expect(gen.next().value).toMatchObject(
      call(
        charactersService.fetchAllCharactersByQuery,
        pagination.currentPage,
        pagination.pageSize,
        mockQuery
      )
    );
    expect(gen.throw(new Error()).value).toMatchObject(
      put(addNotification({ header: 'Error', content: 'failed to fetch' }))
    );
    expect(gen.next().value).toMatchObject(put(setLoading(false)));
    expect(gen.next().done).toBe(true);
  });
  test('fetchByCharacterId', () => {
    const action = { payload: 1, type: '' };
    const character = MOCK_API_RESPONSE.data[0];
    const generator = fetchByCharacterId(action);

    expect(generator.next().value).toMatchObject(
      call(charactersService.fetchCharacterById, action.payload)
    );
    expect(generator.next({ data: character }).value).toMatchObject(
      put(setCharacterData(character))
    );
    expect(generator.next().done).toBe(true);
  });
  test('error on fetchByCharacterId', () => {
    const action = { payload: 1, type: '' };
    const generator = fetchByCharacterId(action);

    expect(generator.next().value).toMatchObject(
      call(charactersService.fetchCharacterById, action.payload)
    );
    expect(generator.throw(new Error()).value).toMatchObject(
      put(addNotification({ header: 'Error', content: 'failed to fetch' }))
    );
    expect(generator.next().done).toBe(true);
  });
  test('fetchByCharacter id with no id', () => {
    const action = { payload: null, type: '' };
    const generator = fetchByCharacterId(action);
    expect(generator.next().value).toMatchObject(put(setCharacterData(null)));
    expect(generator.next().done).toBe(true);
  });
});
