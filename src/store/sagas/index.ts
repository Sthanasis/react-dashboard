import { all } from 'redux-saga/effects';
import {
  watchFetchCharacters,
  watchPaginationOptions,
  watchSearchChange,
  watchCharacterId,
} from '@/store/sagas/characters';

export default function* rootSaga() {
  yield all([
    watchFetchCharacters(),
    watchPaginationOptions(),
    watchSearchChange(),
    watchCharacterId(),
  ]);
}
