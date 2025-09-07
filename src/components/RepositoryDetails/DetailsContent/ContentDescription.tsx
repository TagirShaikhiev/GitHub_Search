import { Typography } from '@mui/material';

export const RepoDescription: React.FC<{ description?: string }> = ({ description }) =>
  description ? (
    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-wrap' }}>
      {description}
    </Typography>
  ) : null;
