import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Header } from 'components/@common';
import { NavBar } from 'components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140px 0 60px;
`;

function PageLayout({ header, children }) {
  return (
    <>
      <NavBar />
      <Body>
        {header && <Header>{header}</Header>}
        {children}
      </Body>
    </>
  );
}

PageLayout.defaultProps = {
  header: '',
};

PageLayout.propTypes = {
  header: PropTypes.string,
};

export default PageLayout;
