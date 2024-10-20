import { call, put, takeEvery } from 'redux-saga/effects';
import charactersService from '@/utilities/charactersService';
import {
  request,
  setCharacters,
  setPaginationOptions,
} from '@/store/features/characters/charactersSlice';
import { ApiResponse } from '@/types/apiResponse';
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchData(): Generator {
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharacters
    );
    yield put(setCharacters(result));
  } catch (err) {
    console.error(err);
  }
}

export function* fetchByPage(
  action: PayloadAction<{ pageSize: number; page: number }>
): Generator {
  const { page, pageSize } = action.payload;
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllPaginatedCharacters,
      page,
      pageSize
    );
    yield put(setCharacters(result));
  } catch (err) {
    console.error(err);
  }
}

export function* watchFetchCharacters() {
  yield takeEvery(request, fetchData);
}

export function* watchPaginationOptions() {
  yield takeEvery(setPaginationOptions, fetchByPage);
}
