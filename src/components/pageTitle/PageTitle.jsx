import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR } from '../../constants/color';

const Container = styled.div`
  height: 67px;
  border-bottom: 4px solid ${COLOR.GRAY_800};
  font-size: 32px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 55px;
`;

const PageTitle = ({ children }) => <Container>{children}</Container>;

PageTitle.propTypes = {
  children: PropTypes.string,
};

export default PageTitle;
