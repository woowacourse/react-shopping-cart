import useSnackBar from 'hooks/useSnackBar';
import reactDom from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const isSnackbarOpen = useSnackBar();

  if (!isSnackbarOpen) return null;

  return reactDom.createPortal(children, document.getElementById('snackbar'));
};

export default Portal;
