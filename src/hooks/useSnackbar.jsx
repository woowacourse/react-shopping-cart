import { useContext } from 'react';
import SnackbarContext from '../context/SnackbarContext';

const useSnackbar = () => {
  const { showSnackbar } = useContext(SnackbarContext);

  return { showSnackbar };
};

export default useSnackbar;
