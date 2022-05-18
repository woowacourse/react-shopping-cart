import usePagination from 'pages/usePagination';
import styled, { css } from 'styled-components';

interface PaginationProps {
  lastIndex: number;
  count: number;
}

const Pagination = ({ count, lastIndex }: PaginationProps) => {
  const { currentPage, pageStartNumber, handleClickNumber, handleClickPrev, handleClickNext } =
    usePagination({ count, lastIndex });

  return (
    <StyledRoot>
      <StyledPageIndicator onClick={handleClickPrev}>이전</StyledPageIndicator>
      {Array.from({ length: count }, (_, index: number) => {
        const page = pageStartNumber + index + 1;
        const shouldShowPage = page <= lastIndex;

        if (!shouldShowPage) return null;

        return (
          <StyledPageIndicator
            key={index}
            selected={currentPage === page}
            onClick={() => handleClickNumber(page)}
          >
            {page}
          </StyledPageIndicator>
        );
      })}
      <StyledPageIndicator onClick={handleClickNext}>다음</StyledPageIndicator>
    </StyledRoot>
  );
};

export default Pagination;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
  width: 100%;
  margin: auto;
`;

const StyledPageIndicator = styled.button<{ selected?: boolean }>`
  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.colors.primary};
      font-weight: 700;
    `}

  font-size: 3rem
`;
