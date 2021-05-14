import React from 'react';

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

const Badge = ({ number }) => {
  return (
    <Flex justifyContent="center" alignItems="center" css={BadgeWrapperStyle}>
      {number}
    </Flex>
  );
};

export default Badge;
