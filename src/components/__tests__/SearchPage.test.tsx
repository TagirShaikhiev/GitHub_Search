import { render, screen, fireEvent } from '@testing-library/react';
import { SearchPage } from '../SearchPage';
import type { RepoSearchResultItem } from '../../api/githubApiTypes';
import '@testing-library/jest-dom';

jest.mock('../Search', () => ({
  Search: ({ searchParams, onSearchParamsChange, onSearch, isLoading }: any) => (
    <div data-testid="search" data-loading={isLoading ? '1' : '0'}>
      <button onClick={() => onSearchParamsChange({ ...searchParams, searchString: 'react' })}>
        set-query
      </button>
      <button onClick={onSearch}>run-search</button>
    </div>
  ),
}));

jest.mock('../RepositoryTable/RepositoryTable', () => ({
  RepositoryTable: ({ repositories, status, onRowClick }: any) => (
    <div data-testid="table" data-status={status ?? ''}>
      <span>rows:{repositories.length}</span>
      <button onClick={() => repositories[0] && onRowClick(repositories[0])}>open-row-0</button>
    </div>
  ),
}));

jest.mock('../Pageable', () => ({
  Pageable: ({ onPageChange, onItemsPerPageChange }: any) => (
    <div data-testid="pageable">
      <button onClick={() => onPageChange(2)}>goto-2</button>
      <button onClick={() => onItemsPerPageChange(50)}>per-50</button>
    </div>
  ),
}));

jest.mock('../RepositoryDetails/RepositoryDetailsDialog', () => ({
  RepositoryDetailsDialog: ({ open, onClose }: any) => (
    <div data-testid="details" data-open={open ? '1' : '0'}>
      <button onClick={onClose}>close-details</button>
    </div>
  ),
}));

const trigger = jest.fn();
let hookState: any = { data: undefined, isLoading: false, isFetching: false, isError: false };

jest.mock('../../api/githubApi', () => ({
  useLazySearchReposByNameQuery: () => [trigger, hookState] as const,
}));

const mkRepo = (id: number): RepoSearchResultItem =>
  ({
    id,
    name: `name-${id}`,
    full_name: `user/name-${id}`,
    html_url: '#',
    owner: { login: 'user' } as any,
    language: 'TS',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    stargazers_count: 10,
    forks_count: 1,
    open_issues_count: 0,
    watchers_count: 2,
    default_branch: 'main',
  } as any);

beforeEach(() => {
  trigger.mockClear();
  hookState = { data: undefined, isLoading: false, isFetching: false, isError: false };
});

test('initial: table=initial, no pagination, dialog closed', () => {
  render(<SearchPage />);
  expect(screen.getByTestId('table')).toHaveAttribute('data-status', 'initial');
  expect(screen.queryByTestId('pageable')).not.toBeInTheDocument();
  expect(screen.getByTestId('details')).toHaveAttribute('data-open', '0');
});

test('run search → trigger called; when data arrives → rows + pagination', () => {
  const { rerender } = render(<SearchPage />);

  fireEvent.click(screen.getByText('set-query'));
  fireEvent.click(screen.getByText('run-search'));
  expect(trigger).toHaveBeenCalledTimes(1);

  hookState = { ...hookState, data: { total_count: 2, items: [mkRepo(1), mkRepo(2)] } };
  rerender(<SearchPage />);

  expect(screen.getByTestId('table')).toHaveTextContent('rows:2');
  expect(screen.getByTestId('table')).toHaveAttribute('data-status', '');
  expect(screen.getByTestId('pageable')).toBeInTheDocument();
});

test('row click opens and close-details closes dialog', () => {
  hookState = { ...hookState, data: { total_count: 1, items: [mkRepo(1)] } };
  const { rerender } = render(<SearchPage />);
  fireEvent.click(screen.getByText('open-row-0'));
  expect(screen.getByTestId('details')).toHaveAttribute('data-open', '1');
  fireEvent.click(screen.getByText('close-details'));
  rerender(<SearchPage />);
  expect(screen.getByTestId('details')).toHaveAttribute('data-open', '0');
});

test('pagination: goto page 2; per_page=50 resets to page=1', () => {
  const { rerender } = render(<SearchPage />);

  fireEvent.click(screen.getByText('run-search'));
  expect(trigger).toHaveBeenCalledTimes(1);

  hookState = { ...hookState, data: { total_count: 100, items: [mkRepo(1)] } };
  rerender(<SearchPage />);

  fireEvent.click(screen.getByText('goto-2'));
  expect(trigger).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 }));

  fireEvent.click(screen.getByText('per-50'));
  expect(trigger).toHaveBeenLastCalledWith(expect.objectContaining({ per_page: 50, page: 1 }));
});

test('empty state after submit shows status "empty"', () => {
  const { rerender } = render(<SearchPage />);

  fireEvent.click(screen.getByText('run-search'));

  hookState = { ...hookState, data: { total_count: 0, items: [] } };
  rerender(<SearchPage />);

  expect(screen.getByTestId('table')).toHaveAttribute('data-status', 'empty');
});

test('error state shows status "error"', () => {
  const { rerender } = render(<SearchPage />);

  hookState = { ...hookState, isError: true };
  rerender(<SearchPage />);

  expect(screen.getByTestId('table')).toHaveAttribute('data-status', 'error');
});
