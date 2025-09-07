import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GitHubReposSearchRequest } from './githubApiTypes';

export const githubReposSearch = createApi({
  reducerPath: 'search/repositories',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (build) => ({
    searchReposByName: build.query({
      query: (searchParams: GitHubReposSearchRequest) => {
        const params = new URLSearchParams();
        params.append('q', searchParams.searchString);
        if (searchParams.sort) {
          params.append('sort', searchParams.sort);
        }
        if (searchParams.order) {
          params.append('order', searchParams.order);
        }
        if (searchParams.per_page) {
          params.append('per_page', String(searchParams.per_page));
        }
        if (searchParams.page) {
          params.append('page', String(searchParams.page));
        }
        return `search/repositories?${String(params)}`;
      },
    }),
  }),
});

export const { useSearchReposByNameQuery, useLazySearchReposByNameQuery } = githubReposSearch;