import React, { useCallback, useMemo, useState } from 'react';
import { useLazySearchReposByNameQuery } from '../api/githubApi';
import { Search } from './Search';
import { Pageable } from './Pageable';
import type { GitHubReposSearchRequest, RepoSearchResultItem } from '../api/githubApiTypes';
import { RepositoryDetailsDialog } from './RepositoryDetails/RepositoryDetailsDialog';
import { type StatusKey } from './types';
import { RepositoryTable } from './RepositoryTable/RepositoryTable';

const DEFAULT_PARAMS: GitHubReposSearchRequest = {
  searchString: '',
  sort: '',
  order: '',
  per_page: 30,
  page: 1,
};

export function SearchPage() {
  const [params, setParams] = useState<GitHubReposSearchRequest>(DEFAULT_PARAMS);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedRepo, setSelectedRepo] = React.useState<RepoSearchResultItem | null>(null);

  const [trigger, { data, isLoading, isFetching, isError }] =
    useLazySearchReposByNameQuery();

  const runSearch = useCallback((next: GitHubReposSearchRequest) => {
    trigger(next);
    setHasSubmitted(true);
  }, [trigger]);

  const handleSearchParamsChange = (next: GitHubReposSearchRequest) => {
    setParams(prev => {
      const shouldResetPage =
        prev.searchString !== next.searchString ||
        prev.sort !== next.sort ||
        prev.order !== next.order ||
        prev.per_page !== next.per_page;

      return shouldResetPage ? { ...next, page: 1 } : next;
    });
  };

  const handleSearch = useCallback(() => {
    runSearch(params);
  }, [params, runSearch]);

  const handlePageChange = useCallback((page: number) => {
    setParams(prev => {
      const next = { ...prev, page };
      if (hasSubmitted) runSearch(next);
      return next;
    });
  }, [hasSubmitted, runSearch]);

  const handleItemsPerPageChange = useCallback((per_page: number) => {
    setParams(prev => {
      const next = { ...prev, per_page, page: 1 };
      if (hasSubmitted) runSearch(next);
      return next;
    });
  }, [hasSubmitted, runSearch]);

  const totalItems = data?.total_count ?? 0;
  const repositories = useMemo<readonly RepoSearchResultItem[]>(
    () => data?.items ?? [],
    [data]
  );
  
  const hasData = repositories.length > 0;
  const isInitial = !hasSubmitted && !isLoading && !isError;

  const tableStatus: StatusKey | null =
  isLoading ? 'loading' :
    isError ? 'error' :
      isInitial ? 'initial' :
        (!hasData ? 'empty' : null);

  return (
    <>
      <Search
        searchParams={params}
        onSearchParamsChange={handleSearchParamsChange}
        onSearch={handleSearch}
        isLoading={isFetching}
      />
      <RepositoryTable
        repositories={repositories}
        status={tableStatus}
        onRowClick={setSelectedRepo}
      />
      <RepositoryDetailsDialog
        open={Boolean(selectedRepo)}
        repo={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />
      {hasSubmitted && totalItems > 0 && (
        <Pageable
          totalCount={totalItems}
          itemsPerPage={params.per_page}
          currentPage={params.page}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}
    </>
  );
}
