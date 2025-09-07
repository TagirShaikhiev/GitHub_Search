import type { GitHubReposSearchRequest } from '../api/githubApiTypes';

export type SortBy = 'stars' | 'forks' | 'help-wanted-issues' | 'updated' | '';
export type SortOrder = 'asc' | 'desc' | '';

export const sortByOptions: SortBy[] = ['', 'stars', 'forks', 'help-wanted-issues', 'updated'];
export const sortOrderOptions: SortOrder[] = ['', 'asc', 'desc'];

export interface SearchProps {
  searchParams: GitHubReposSearchRequest;
  onSearchParamsChange: (params: GitHubReposSearchRequest) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export interface PageableProps {
  totalCount: number;
  itemsPerPage?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
}

export const STATUS_MESSAGES = {
  initial: 'Type a query to start searching.',
  loading: 'Loading…',
  error: 'Failed to load data.',
  empty: 'No results found.',
} as const;

export type StatusKey = keyof typeof STATUS_MESSAGES;

export type Col<T> = {
  id: string;
  header: string;
  width?: string | number;
  render: (repo: T) => React.ReactNode;
};
