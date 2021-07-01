import React from 'react';
import PropTypes from 'prop-types';

import PALETTE from '../../../constants/palette';

import * as Styled from './style';

const Snackbar = ({ message, ms, backgroundColor }) => {
  return (
    <Styled.SnackbarContainer backgroundColor={backgroundColor} time={`${ms / 1000}s`}>
      {message}
    </Styled.SnackbarContainer>
  );
};

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
  ms: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default {
  title: 'Common/Snackbar',
  component: Snackbar,
  argTypes: {},
};

const Template = (args) => <Snackbar {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: '장바구니에 상품이 추가되었습니다.',
  ms: 3000,
  backgroundColor: PALETTE.GRAY_008,
};
