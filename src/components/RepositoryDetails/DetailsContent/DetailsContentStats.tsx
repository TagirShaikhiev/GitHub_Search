import * as React from 'react';
import { BugReport, CallSplit, Star, Visibility } from '@mui/icons-material';
import { Chip, Stack, Tooltip } from '@mui/material';
import type { RepoSearchResultItem } from 'api/githubApiTypes';
import { nf } from '../../helpers';

export const RepoStats: React.FC<{ repo: RepoSearchResultItem }> = ({ repo }) => {
  const items = [
    { key: 'stars', icon: <Star fontSize="small" />, value: repo.stargazers_count },
    { key: 'forks', icon: <CallSplit fontSize="small" />, value: repo.forks_count },
    { key: 'issues', icon: <BugReport fontSize="small" />, value: repo.open_issues_count },
    { key: 'watchers', icon: <Visibility fontSize="small" />,value: repo.watchers_count },
  ];

  return (
    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" alignItems="center">
      {items.map((i) => (
        <Tooltip key={i.key} title={`${i.key}: ${i.value}`} placement="top" arrow>
          <Chip icon={i.icon} label={nf.format(i.value ?? 0)} size="small" />
        </Tooltip>
      ))}
      <Chip label={`default: ${repo.default_branch}`} variant="outlined" size="small" />
    </Stack>
  );
};
