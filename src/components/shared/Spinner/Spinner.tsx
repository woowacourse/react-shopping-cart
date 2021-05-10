import React from 'react';
import Styled from './Spinner.styles';
import spinnerImageUrl from '../../../assets/images/spinner.gif';

const Spinner = () => {
  return <Styled.Root src={spinnerImageUrl} alt="loading" />;
};

export default Spinner;
