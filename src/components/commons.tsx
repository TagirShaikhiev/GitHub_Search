import { ContentCopy } from '@mui/icons-material';
import {
  IconButton, Link as MuiLink,
  ListItem, ListItemText, Tooltip,
  Stack,
  Typography,
  Avatar,
  Chip,
  TableRow,
  TableCell,
} from '@mui/material';
import { copy, formatDate } from './helpers';
import { STATUS_MESSAGES, type RepositoryTableProps } from './types';

export const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <ListItem>
    <ListItemText primary={label} secondary={value} />
  </ListItem>
);

export const LinkItem: React.FC<{ label: string; href: string }> = ({ label, href }) => (
  <ListItem>
    <ListItemText
      primary={label}
      secondary={
        <MuiLink href={href} target="_blank" rel="noopener noreferrer">
          {href}
        </MuiLink>
      }
    />
  </ListItem>
);

export const CopyableItem: React.FC<{ label: string; value: string; tooltip: string }> = ({ label, value, tooltip }) => (
  <ListItem
    secondaryAction={
      <Tooltip title={tooltip}>
        <IconButton edge="end" size="small" onClick={() => copy(value)}>
          <ContentCopy fontSize="inherit" />
        </IconButton>
      </Tooltip>
    }
  >
    <ListItemText primary={label} secondary={value} />
  </ListItem>
);

export const RepoCell: React.FC<{ name: string; fullName: string; url: string; onLinkClick?: React.MouseEventHandler }> = ({
  name, fullName, url, onLinkClick,
}) => (
  <Stack spacing={0.25}>
    <MuiLink
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      underline="hover"
      sx={{
        fontWeight: 600,
        display: 'inline-block',
        maxWidth: 420,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      onClick={(e) => {
        onLinkClick?.(e);
        e.stopPropagation();
      }}
    >
      {name}
    </MuiLink>
    <Typography variant="caption" color="text.secondary" noWrap>
      {fullName}
    </Typography>
  </Stack>
);

export const OwnerCell: React.FC<{
  login?: string;
  avatar?: string;
  url?: string;
  onLinkClick?: React.MouseEventHandler;
}> = ({ login, avatar, url, onLinkClick }) => {
  const label = login ?? '—';
  if (!login) return <>—</>;
  return (
    <Stack direction="row" spacing={1} alignItems="center" overflow="hidden">
      <Avatar src={avatar} alt={label} sx={{ width: 24, height: 24 }} />
      {url ? (
        <MuiLink
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          noWrap
          onClick={(e) => {
            onLinkClick?.(e);
            e.stopPropagation();
          }}
        >
          {label}
        </MuiLink>
      ) : (
        <Typography variant="body2" noWrap>{label}</Typography>
      )}
    </Stack>
  );
};

export const LangCell: React.FC<{ language?: string | null }> = ({ language }) =>
  language ? <Chip label={language} size="small" variant="outlined" /> : <>—</>;

export const DateCell: React.FC<{ value?: string }> = ({ value }) => <>{formatDate(value)}</>;

export const StatusRow: React.FC<{ colSpan: number; status: RepositoryTableProps['status'] }> = ({ colSpan, status }) => (
  <TableRow>
    <TableCell colSpan={colSpan} align="center">
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography color="text.secondary">{status ? STATUS_MESSAGES[status] : ''}</Typography>
      </Stack>
    </TableCell>
  </TableRow>
);