import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '@/types/notification';

const initialState: Notification[] = [];

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state = [...state, action.payload];
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state = state.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
