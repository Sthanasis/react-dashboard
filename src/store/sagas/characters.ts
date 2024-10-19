import { call, put, takeEvery } from 'redux-saga/effects';
import charactersService from '@/utilities/charactersService';
import {
  setCharacters,
  setPageCount,
  setTotalPages,
} from '@/store/features/characters/charactersSlice';
import { ApiResponse } from '@/types/apiResponse';

export function* fetchDisneyCharacterData(): Generator {
  try {
    const result: ApiResponse = yield call(
      charactersService.fetchAllCharacters
    );
    yield put(setCharacters(result.data));
    yield put(setPageCount(result.info));
    yield put(setTotalPages(result.info));
  } catch (err) {
    console.error(err);
  }
}

export function* watchFetchCharacters() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchDisneyCharacterData);
}
