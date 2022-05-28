import * as S from './PageLayout.styles';
import PropTypes from 'prop-types';

import { Header } from 'components/@common';
import { NavBar } from 'components';

function PageLayout({ header, children }) {
  return (
    <>
      <NavBar />
      <S.Body>
        {header && <Header>{header}</Header>}
        {children}
      </S.Body>
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
