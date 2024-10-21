import { call, put, select, takeEvery } from 'redux-saga/effects';
import charactersService from '@/utilities/charactersService';
import {
  request,
  searchByFilter,
  selectActiveFilter,
  selectPaginationOptions,
  selectSearch,
  setCharacterData,
  setCharacterId,
  setCharacters,
  setInitialData,
  setPaginationOptions,
  setTotalPages,
} from '@/store/features/characters/charactersSlice';
import { ApiResponse } from '@/types/apiResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { PaginationOptions } from '@/types/paginationOptions';
import { MOCK_API_RESPONSE } from '@/mocks/mockApiResponse';

export function* fetchData(): Generator {
  vi.spyOn(charactersService, 'fetchAllCharacters').mockResolvedValue(
    MOCK_API_RESPONSE
  );
  vi.spyOn(charactersService, 'fetchAllCharactersByQuery').mockResolvedValue(
    MOCK_API_RESPONSE
  );
  vi.spyOn(charactersService, 'fetchCharacterById').mockResolvedValue(
    MOCK_API_RESPONSE
  );
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharacters
    );
    yield put(setInitialData(result));
  } catch (err) {
    console.error(err);
  }
}

export function* fetchBySearch(): Generator {
  const { currentPage, pageSize }: PaginationOptions = yield select(
    selectPaginationOptions
  );
  const search = yield select(selectSearch);
  const filter = yield select(selectActiveFilter);
  try {
    const result: ApiResponse<DisneyCharacter[] | DisneyCharacter> = yield call(
      charactersService.fetchAllCharactersByQuery,
      currentPage,
      pageSize,
      { query: filter, value: search }
    );
    const payload: ApiResponse = {
      info: result.info,
      data: Array.isArray(result.data) ? result.data : [result.data],
    };
    yield put(setCharacters(payload));
    yield put(setTotalPages(result.info.totalPages));
  } catch (err) {
    console.error(err);
  }
}
export function* fetchByCharacterId(
  action: PayloadAction<number | null>
): Generator {
  const id = action.payload;
  if (!id) {
    yield put(setCharacterData(null));
    return;
  }
  try {
    const result = yield call(charactersService.fetchCharacterById, id);
    yield put(setCharacterData(result.data));
  } catch (err) {
    console.error(err);
  }
}

export function* watchFetchCharacters() {
  yield takeEvery(request, fetchData);
}

export function* watchPaginationOptions() {
  yield takeEvery(setPaginationOptions, fetchBySearch);
}

export function* watchSearchChange() {
  yield takeEvery(searchByFilter, fetchBySearch);
}

export function* watchCharacterId() {
  yield takeEvery(setCharacterId, fetchByCharacterId);
}
