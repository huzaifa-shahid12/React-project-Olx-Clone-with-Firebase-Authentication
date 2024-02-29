import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
  reducer: {
    allcart: persistedReducer,
    // cartSlice.reducer
  },
});

const persistor = persistStore(store);

export {
  store , persistor
} 

  
