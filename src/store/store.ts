import { configureStore } from "@reduxjs/toolkit";
import portfolioReducer from "./portfolioSlice";
import { saveAssetsToLocalStorage } from "@/lib/localStorage";

const loadInitialState = () => {
  if (typeof window === "undefined") {
    return { portfolio: { assets: [] } };
  }
  return undefined;
};

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
  },
  preloadedState: loadInitialState(),
});

store.subscribe(() => {
  const state = store.getState();
  saveAssetsToLocalStorage(state.portfolio.assets);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
