import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseNotification, Notification } from '@/types/notification';

type InitialState = {
  list: Notification[];
};

const initialState: InitialState = {
  list: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<BaseNotification>) => {
      state.list = [
        ...state.list,
        { ...action.payload, id: state.list.length },
      ];
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
