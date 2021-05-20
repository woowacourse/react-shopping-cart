import Button from '../../atom/Button/Button';
import { PageButtonContainer, PageIndex } from './PageIndexNav.styles';

interface PageIndexNavProps {
  onClickPrevPage: React.MouseEventHandler<HTMLButtonElement>;
  onClickNextPage: React.MouseEventHandler<HTMLButtonElement>;
  pageIndex: number;
  maxPageIndex: number;
}
const PageIndexNav = ({
  onClickPrevPage,
  pageIndex,
  onClickNextPage,
  maxPageIndex,
}: PageIndexNavProps) => {
  const isMovePrevButtonDisabled = pageIndex === 0;
  const isMoveNextButtonDisabled = pageIndex === maxPageIndex;

  return (
    <PageButtonContainer>
      <Button onClick={onClickPrevPage} disabled={isMovePrevButtonDisabled}>
        이전
      </Button>
      <PageIndex>{pageIndex + 1}</PageIndex>
      <Button onClick={onClickNextPage} disabled={isMoveNextButtonDisabled}>
        다음
      </Button>
    </PageButtonContainer>
  );
};

export default PageIndexNav;
export type { PageIndexNavProps };
