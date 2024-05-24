import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { userApi, userReducer } from './user';
import storage from 'redux-persist/lib/storage';
import { itemApi, itemReducer } from './item';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedItemReducer = persistReducer(persistConfig, itemReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    userSlice: persistedUserReducer,
    itemSlice: persistedItemReducer,
    [userApi.reducerPath]: userApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: null,
    }).concat(userApi.middleware, itemApi.middleware),
});

export const persistor = persistStore(store);
export default store;
