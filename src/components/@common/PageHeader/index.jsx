import PropTypes from 'prop-types';

import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';

const PageHeader = ({ pageTitle }) => (
  <>
    <CommonStyled.PageTitle>{pageTitle}</CommonStyled.PageTitle>
    <CommonStyled.HR color={COLORS.BLACK} />
  </>
);

PageHeader.propTypes = {
  pageTitle: PropTypes.string,
};

PageHeader.defaultProps = {
  pageTitle: '예시 페이지 제목',
};

export default PageHeader;
