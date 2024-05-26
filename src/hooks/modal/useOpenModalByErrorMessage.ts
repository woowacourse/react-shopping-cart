import { useEffect, useState } from 'react';

interface UseOpenModalByErrorMessageProps {
  errorMessage: string;
}
const useOpenModalByErrorMessage = ({ errorMessage }: UseOpenModalByErrorMessageProps) => {
  const [openModal, setOpenModal] = useState(errorMessage !== '');

  useEffect(() => {
    setOpenModal(errorMessage !== '');
  }, [errorMessage]);

  return { openModal, setOpenModal };
};

export default useOpenModalByErrorMessage;
