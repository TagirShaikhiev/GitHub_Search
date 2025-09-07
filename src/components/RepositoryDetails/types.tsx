import type { RepoSearchResultItem } from 'api/githubApiTypes';

export interface DetailsActionsProps {
  url: string, 
  onClose: () => void
}

export interface RepositoryDetailsDialogProps {
  open: boolean;
  repo: RepoSearchResultItem | null;
  onClose: () => void;
};

export interface DetailsHeaderProps {
  repo: RepoSearchResultItem, onClose: () => void
} 
