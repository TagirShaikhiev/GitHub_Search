import { RepoHeader } from './ContentHeader';
import { RepoStats } from './DetailsContentStats';
import { RepoDescription } from './ContentDescription';
import { RepoTopics } from './Topics';
import { RepoInfoList } from './ContentInfoList';
import { RepoLinksList } from './ContentLinksList';
import { DialogContent, Grid } from '@mui/material';
import type { DetailsContentProps } from './types';

export const DetailsContent: React.FC<DetailsContentProps> = ({ repo }) => (
  <DialogContent dividers>
    <RepoHeader repo={repo} />
    <RepoStats repo={repo} />
    <RepoDescription description={repo.description || undefined} />
    <RepoTopics topics={repo.topics} />

    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <RepoInfoList repo={repo} />
      </Grid>
      <Grid item xs={12} md={6}>
        <RepoLinksList repo={repo} />
      </Grid>
    </Grid>
  </DialogContent>
);