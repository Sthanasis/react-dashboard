import { all } from 'redux-saga/effects';
import {
  watchFetchCharacters,
  watchPaginationOptions,
  watchSearchChange,
} from '@/store/sagas/characters';

export default function* rootSaga() {
  yield all([
    watchFetchCharacters(),
    watchPaginationOptions(),
    watchSearchChange(),
  ]);
}
