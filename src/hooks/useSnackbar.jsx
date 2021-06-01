import { useContext } from 'react';
import SnackbarContext from '../context/SnackbarContext';

const useSnackbar = () => {
  const { addSnackbar } = useContext(SnackbarContext);

  return { addSnackbar };
};

export default useSnackbar;
