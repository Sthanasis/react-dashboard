import { call, put, select, takeEvery } from 'redux-saga/effects';
import charactersService from '@/utilities/charactersService';
import {
  PaginationOptions,
  request,
  selectPaginationOptions,
  selectSearchedName,
  setCharacters,
  setInitialData,
  setPaginationOptions,
  setSearchedName,
  setTotalPages,
} from '@/store/features/characters/charactersSlice';
import { ApiResponse } from '@/types/apiResponse';
import { PayloadAction } from '@reduxjs/toolkit';

export function* fetchData(): Generator {
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharacters
    );
    yield put(setInitialData(result));
  } catch (err) {
    console.error(err);
  }
}

export function* fetchByPage(
  action: PayloadAction<{ pageSize: number; page: number }>
): Generator {
  const { page, pageSize } = action.payload;
  const searchedName: string = yield select(selectSearchedName);
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharactersByQuery,
      page,
      pageSize,
      searchedName
    );
    yield put(setCharacters(result));
    yield put(setTotalPages(result.info.totalPages));
  } catch (err) {
    console.error(err);
  }
}

export function* fetchBySearch(action: PayloadAction<string>): Generator {
  const { currentPage, pageSize }: PaginationOptions = yield select(
    selectPaginationOptions
  );
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharactersByQuery,
      currentPage,
      pageSize,
      action.payload
    );
    yield put(setCharacters(result));
    yield put(setTotalPages(result.info.totalPages));
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

export function* watchSearchChange() {
  yield takeEvery(setSearchedName, fetchBySearch);
}
