import { Chip, Stack } from '@mui/material';

export const RepoTopics: React.FC<{ topics?: string[] }> = ({ topics }) =>
  topics && topics.length > 0 ? (
    <Stack direction="row" spacing={1} mb={2} useFlexGap flexWrap="wrap">
      {topics.map((t) => (
        <Chip key={t} label={t} size="small" variant="outlined" />
      ))}
    </Stack>
  ) : null;
