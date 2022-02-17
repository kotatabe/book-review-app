import React, { createContext, useState } from 'react';
import type { AlertColor } from '@mui/material/Alert';
import { Props } from './PropsInterface';

export interface StatusInterface {
  open: boolean;
  severity: AlertColor;
  message: string;
}

interface AlertStatContextInterface {
  status: StatusInterface;
  setStatus: React.Dispatch<React.SetStateAction<StatusInterface>>;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const AlertStatContext = createContext({} as AlertStatContextInterface);

function AlertStatProvider({ children }: Props) {
  const [status, setStatus] = useState<StatusInterface>({
    open: false,
    severity: 'success',
    message: '成功しました。',
  });

  const handleClose = ( event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setStatus({
      ...status,
      open: false,
    });
  };

  return (
    <AlertStatContext.Provider value={{ status, setStatus, handleClose }}>
      {children}
    </AlertStatContext.Provider>
  );
}

export default AlertStatProvider;
