import { Close } from '@mui/icons-material';
import {
  Chip,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import type { DetailsHeaderProps } from './types';

export const DetailsLabel = (props: DetailsHeaderProps) => {
  const {repo, onClose} = props;
  return (
    <DialogTitle sx={{ pr: 6 }}>
      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {repo.full_name}
        </Typography>
        {repo.archived && <Chip label="archived" size="small" color="warning" variant="outlined" />}
        {repo.private && <Chip label="private" size="small" variant="outlined" />}
        {repo.visibility && <Chip label={repo.visibility} size="small" variant="outlined" />}
      </Stack>
      <IconButton
        aria-label="Close"
        onClick={onClose}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  );
};