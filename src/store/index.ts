import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '@/store/features/characters/charactersSlice';
import notificationsReducer from '@/store/features/notifications/notificationsSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@/store/sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
