import { List } from '@mui/material';
import type { RepoSearchResultItem } from 'api/githubApiTypes';
import { CopyableItem, LinkItem } from '../../commons';

export const RepoLinksList: React.FC<{ repo: RepoSearchResultItem }> = ({ repo }) => (
  <List dense>
    <CopyableItem label="HTTPS" value={repo.clone_url} tooltip="Copy HTTPS URL" />
    <CopyableItem label="SSH" value={repo.ssh_url} tooltip="Copy SSH URL" />
    {repo.homepage && <LinkItem label="Homepage" href={repo.homepage} />}
    <LinkItem label="GitHub" href={repo.html_url} />
  </List>
);
