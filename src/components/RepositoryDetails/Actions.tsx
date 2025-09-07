import { OpenInNew } from '@mui/icons-material';
import { Button, DialogActions } from '@mui/material';
import type { DetailsActionsProps } from './types';

export const DetailsAction: React.FC<DetailsActionsProps>  = (props) => {
  const {url, onClose} = props;
  return (      
    <DialogActions>
      <Button
        variant="contained"
        endIcon={<OpenInNew />}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
          Open on GitHub
      </Button>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>);
};