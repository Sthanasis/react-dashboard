import { all } from 'redux-saga/effects';
import { watchFetchCharacters } from '@/store/sagas/characters';

export default function* rootSaga() {
  yield all([watchFetchCharacters]);
}
