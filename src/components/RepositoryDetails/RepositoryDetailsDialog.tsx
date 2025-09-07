import * as React from 'react';
import {
  Dialog,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { RepositoryDetailsDialogProps } from './types';
import { DetailsLabel } from './DetailsLabel';
import { DetailsContent } from './DetailsContent/Content';
import { DetailsAction } from './Actions';

export const RepositoryDetailsDialog: React.FC<RepositoryDetailsDialogProps> = ({
  open,
  repo,
  onClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!repo) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={fullScreen}>
      <DetailsLabel repo={repo} onClose={onClose} />
      <DetailsContent repo={repo}/>
      <DetailsAction url={repo.git_url} onClose={onClose}/>
    </Dialog>
  );
};
