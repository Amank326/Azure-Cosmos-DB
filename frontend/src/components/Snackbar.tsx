import React from 'react';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoHideDuration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
  autoHideDuration = 5000,
}) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
