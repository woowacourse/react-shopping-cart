import { COLORS } from '../../../constants';
import * as Styled from './Pagination.styles';

export interface Props {
  maxPageNumber?: number;
  activePaginationIndex: number;
  onPaginationButtonClick: (index: number) => void;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

const Pagination = ({
  maxPageNumber = 10,
  activePaginationIndex,
  onPaginationButtonClick,
  onPrevButtonClick,
  onNextButtonClick,
}: Props) => {
  const PaginationButtonList = [...Array(maxPageNumber)].map((_, index) => (
    <Styled.PaginationButton onClick={() => onPaginationButtonClick(index)} isActive={activePaginationIndex === index}>
      {index + 1}
    </Styled.PaginationButton>
  ));

  return (
    <Styled.Pagination>
      <Styled.PrevButtonWrapper onClick={onPrevButtonClick}>{'<'}</Styled.PrevButtonWrapper>
      <Styled.PaginationButtonWrapper>{PaginationButtonList}</Styled.PaginationButtonWrapper>
      <Styled.NextButtonWrapper onClick={onNextButtonClick}>{'>'}</Styled.NextButtonWrapper>
    </Styled.Pagination>
  );
};

export default Pagination;
