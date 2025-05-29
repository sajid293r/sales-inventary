import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import inventoryReducer from './features/inventory/inventorySlice';
import saleChannelReducer from './features/saleChannel/saleChannelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    inventory: inventoryReducer,
    saleChannel: saleChannelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 