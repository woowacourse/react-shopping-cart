import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLOR } from '../constant';

const TitleWrapper = styled.div`
  width: 1320px;
  height: 64px;
  border-bottom: 4px solid ${COLOR.GRAY[900]};
  text-align: center;
  padding-bottom: 22px;
`;

const Title = styled.h2`
  font-size: 32px;
  line-height: 37.3px;
`;

const PageTitle = ({ pageTitle }) => {
  return (
    <TitleWrapper>
      <Title>{pageTitle}</Title>
    </TitleWrapper>
  );
};

PageTitle.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default PageTitle;
