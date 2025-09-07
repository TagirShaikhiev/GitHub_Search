import { List } from '@mui/material';
import type { RepoSearchResultItem } from 'api/githubApiTypes';
import { InfoItem } from '../../commons';
import { formatDate, fromNow, nf, yesNo } from '../../helpers';

export const RepoInfoList: React.FC<{ repo: RepoSearchResultItem }> = ({ repo }) => {
  const items = [
    { label: 'Created', value: `${formatDate(repo.created_at)} • ${fromNow(repo.created_at)}` },
    { label: 'Updated', value: `${formatDate(repo.updated_at)} • ${fromNow(repo.updated_at)}` },
    { label: 'Last push', value: `${formatDate(repo.pushed_at)} • ${fromNow(repo.pushed_at)}` },
    { label: 'Size (KB)', value: nf.format(repo.size) },
    {
      label: 'Has issues / wiki / pages',
      value: `${yesNo(repo.has_issues)} / ${yesNo(repo.has_wiki)} / ${yesNo(repo.has_pages)}`
    },
    { label: 'Allow forking', value: yesNo(repo.allow_forking) },
  ];

  return (
    <List dense>
      {items.map((it) => (
        <InfoItem key={it.label} label={it.label} value={it.value} />
      ))}
    </List>
  );
};
