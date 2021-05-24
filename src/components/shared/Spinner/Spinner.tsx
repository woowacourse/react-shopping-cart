import React from 'react';
import spinnerImageUrl from 'assets/images/spinner.gif';
import Styled from './Spinner.styles';

const Spinner = () => {
  return <Styled.Root src={spinnerImageUrl} alt="loading" />;
};

export default Spinner;
