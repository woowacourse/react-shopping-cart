import React, { ReactElement } from 'react';
import spinnerImageUrl from 'assets/images/spinner.gif';
import Styled from './Spinner.styles';

const Spinner = (): ReactElement => {
  return <Styled.Root src={spinnerImageUrl} alt="loading" />;
};

export default Spinner;
