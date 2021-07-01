import { useState } from 'react';

const useErrorModal = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => setErrorMessage('');

  const openModal = (message) => setErrorMessage(message);

  return { errorMessage, closeModal, openModal };
};

export default useErrorModal;
