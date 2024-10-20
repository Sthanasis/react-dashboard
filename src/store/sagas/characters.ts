import { call, put, select, takeEvery } from 'redux-saga/effects';
import charactersService from '@/utilities/charactersService';
import {
  PaginationOptions,
  request,
  selectPaginationOptions,
  selectSearchedName,
  setCharacterData,
  setCharacterId,
  setCharacters,
  setInitialData,
  setPaginationOptions,
  setSearchedName,
  setTotalPages,
} from '@/store/features/characters/charactersSlice';
import { ApiResponse } from '@/types/apiResponse';
import { PayloadAction } from '@reduxjs/toolkit';
import { DisneyCharacter } from '@/types/disneyCharacter';

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
    const result: ApiResponse<DisneyCharacter[] | DisneyCharacter> = yield call(
      charactersService.fetchAllCharactersByQuery,
      currentPage,
      pageSize,
      action.payload
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
  yield takeEvery(setPaginationOptions, fetchByPage);
}

export function* watchSearchChange() {
  yield takeEvery(setSearchedName, fetchBySearch);
}

export function* watchCharacterId() {
  yield takeEvery(setCharacterId, fetchByCharacterId);
}
