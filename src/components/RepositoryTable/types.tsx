import type { RepoSearchResultItem } from 'api/githubApiTypes';
import type { StatusKey } from 'components/types';

export interface RepositoryTableProps {
  repositories: readonly RepoSearchResultItem[];
  status?: StatusKey | null;
  onRowClick?: (repo: RepoSearchResultItem) => void;
}