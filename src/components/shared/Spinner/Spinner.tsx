import React, { ReactElement } from 'react';
import Styled from './Spinner.styles';
import spinnerImageUrl from '../../../assets/images/spinner.gif';

const Spinner = (): ReactElement => {
  return <Styled.Root src={spinnerImageUrl} alt="loading" />;
};

export default Spinner;
