import { all } from 'redux-saga/effects';
import {
  watchFetchCharacters,
  watchPaginationOptions,
} from '@/store/sagas/characters';

export default function* rootSaga() {
  yield all([watchFetchCharacters(), watchPaginationOptions()]);
}
