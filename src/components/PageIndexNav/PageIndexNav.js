import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { PageButtonContainer, PageIndex } from './PageIndexNav.styles';

const PageIndexNav = ({ onClickPrevPage, onClickNextPage, pageIndex, maxPageIndex }) => (
  <PageButtonContainer>
    <Button onClick={onClickPrevPage} disabled={pageIndex === 0}>
      이전
    </Button>
    <PageIndex>{pageIndex + 1}</PageIndex>
    <Button onClick={onClickNextPage} disabled={pageIndex === maxPageIndex}>
      다음
    </Button>
  </PageButtonContainer>
);

PageIndexNav.propTypes = {
  onClickPrevPage: PropTypes.func.isRequired,
  onClickNextPage: PropTypes.func.isRequired,
  pageIndex: PropTypes.number.isRequired,
  maxPageIndex: PropTypes.number.isRequired,
};

export default PageIndexNav;
