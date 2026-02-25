import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/userAuth/model/authSlice";
import settingsReducer from "../../features/settings/model/settingsSlice";
import { baseApi } from "../../shared/api/baseApi";

// Конфигурация persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["settings"], // Сохраняем только settings
};

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
