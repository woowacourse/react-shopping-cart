import React from 'react';
import PropTypes from 'prop-types';

import Flex from './Flex';

import { css } from 'styled-components';

const BadgeWrapperStyle = css`
  position: absolute;
  top: -10px;
  right: -20px;
  width: 24px;
  height: 24px;
  color: #ffffff;
  font-size: 14px;
  line-height: 24px;
  border: none;
  border-radius: 50%;
  background-color: #ff4d4f;
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
