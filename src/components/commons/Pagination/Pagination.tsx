import * as Styled from './Pagination.styles';

export interface Props {
  maxPageNumber?: number;
  onPaginationButtonClick: () => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const Pagination = ({ maxPageNumber = 10, onPaginationButtonClick, onPrevButtonClick, onNextButtonClick }: Props) => {
  const PaginationButtonList = [...Array(maxPageNumber)].map((_, index) => (
    <Styled.PaginationButton>{index + 1}</Styled.PaginationButton>
  ));

  return (
    <Styled.Pagination>
      <Styled.PrevButtonWrapper onClick={onPrevButtonClick}>{'<'}</Styled.PrevButtonWrapper>
      <Styled.PaginationButtonWrapper onClick={onPaginationButtonClick}>
        {PaginationButtonList}
      </Styled.PaginationButtonWrapper>
      <Styled.NextButtonWrapper onClick={onNextButtonClick}>{'>'}</Styled.NextButtonWrapper>
    </Styled.Pagination>
  );
};

export default Pagination;
