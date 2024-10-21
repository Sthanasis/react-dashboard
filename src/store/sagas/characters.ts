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
  setLoading,
  setPaginationOptions,
  setTotalPages,
} from '@/store/features/characters/charactersSlice';
import { ApiResponse } from '@/types/apiResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { DisneyCharacter } from '@/types/disneyCharacter';
import { PaginationOptions } from '@/types/paginationOptions';
import { addNotification } from '../features/notifications/notificationsSlice';

export function* fetchData(): Generator {
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharacters
    );
    yield put(setInitialData(result));
  } catch (err) {
    yield put(
      addNotification({
        header: 'Error',
        content: 'failed to fetch',
      })
    );
    console.error(err);
  } finally {
    yield put(setLoading(false));
  }
}

export function* fetchByQuery(): Generator {
  const { currentPage, pageSize }: PaginationOptions = yield select(
    selectPaginationOptions
  );
  const search = yield select(selectSearch);
  const filter = yield select(selectActiveFilter);
  try {
    yield put(setLoading(true));
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
    yield put(
      addNotification({
        header: 'Error',
        content: 'failed to fetch',
      })
    );
    console.error(err);
  } finally {
    yield put(setLoading(false));
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
    yield put(
      addNotification({
        header: 'Error',
        content: 'failed to fetch',
      })
    );
    console.error(err);
  }
}

export function* watchFetchCharacters() {
  yield takeEvery(request, fetchData);
}

export function* watchPaginationOptions() {
  yield takeEvery(setPaginationOptions, fetchByQuery);
}

export function* watchSearchChange() {
  yield takeEvery(searchByFilter, fetchByQuery);
}

export function* watchCharacterId() {
  yield takeEvery(setCharacterId, fetchByCharacterId);
}
