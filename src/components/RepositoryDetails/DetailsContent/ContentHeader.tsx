import { Avatar, Chip, Divider, Stack, Typography, Link as MuiLink, } from '@mui/material';
import type { RepoSearchResultItem } from 'api/githubApiTypes';

export const RepoHeader: React.FC<{ repo: RepoSearchResultItem }> = ({ repo }) => (
  <Stack direction="row" spacing={2} alignItems="center" mb={2} flexWrap="wrap">
    <Avatar src={repo.owner?.avatar_url} alt={repo.owner?.login} sx={{ width: 36, height: 36 }} />
    {repo.owner?.html_url ? (
      <MuiLink href={repo.owner.html_url} target="_blank" rel="noopener noreferrer" underline="hover" sx={{ fontWeight: 500 }}>
        {repo.owner.login}
      </MuiLink>
    ) : (
      <Typography>{repo.owner?.login}</Typography>
    )}
    <Divider orientation="vertical" flexItem />
    <Chip label={repo.language ?? '—'} size="small" variant="outlined" />
    {repo.license?.name && <Chip label={repo.license.name} size="small" />}
  </Stack>
);
