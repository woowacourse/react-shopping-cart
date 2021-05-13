import React from 'react';

import styled from 'styled-components';

const BadgeWrapper = styled.div`
  position: absolute;
  top: -10px;
  right: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  return <BadgeWrapper>{number}</BadgeWrapper>;
};

export default Badge;
