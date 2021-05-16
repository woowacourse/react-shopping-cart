import React from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';

import { COLOR } from '../../constant';

import { css } from 'styled-components';

const BadgeWrapperStyle = css`
  position: absolute;
  top: -10px;
  right: -20px;
  width: 24px;
  height: 24px;
  color: ${COLOR.WHITE[400]};
  font-size: 14px;
  line-height: 24px;
  border: none;
  border-radius: 50%;
  background-color: ${COLOR.RED[300]};
`;

const Badge = ({ children }) => {
  return (
    <Flex justifyContent="center" alignItems="center" css={BadgeWrapperStyle}>
      {children}
    </Flex>
  );
};

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
};

export default Badge;
