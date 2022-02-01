import {
  createContext,
  useState,
} from 'react';

export const AlertStatContext = createContext({
  status: {},
  setStaus: () => { },
  handleClose: () => { },
});

function AlertStatProvider({ children }) {
  const [status, setStatus] = useState({
    open: false,
    severity: 'success',
    message: '成功しました。',
  });

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setStatus({
      ...status, open: false,
    });
  };

  return (
    <AlertStatContext.Provider
      value={{ status, setStatus, handleClose }}>
      {children}
    </AlertStatContext.Provider>
  );
}

export default AlertStatProvider;