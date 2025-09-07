import { configureStore } from '@reduxjs/toolkit';
import { githubReposSearch } from '../api/githubApi';

export const store = configureStore({
  reducer: {
    [githubReposSearch.reducerPath]: githubReposSearch.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubReposSearch.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;