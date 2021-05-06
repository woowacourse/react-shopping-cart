import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

const StyledTitle = styled.div`
  height: 67px;
  padding-bottom: 29px;
  border-bottom: 4px solid ${COLOR.GRAY_800};
  font-size: 32px;
  text-align: center;
  font-weight: 600;
`;

const PageTitle = ({ children }) => <StyledTitle>{children}</StyledTitle>;

export default PageTitle;
