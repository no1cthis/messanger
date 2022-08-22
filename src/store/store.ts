import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./slices/rootReducer";

export const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootReducer = ReturnType<typeof rootReducer>;
export type StoreType = ReturnType<typeof store>;
export type DispatchType = StoreType["dispatch"];
