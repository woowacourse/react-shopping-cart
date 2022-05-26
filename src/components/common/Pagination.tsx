import usePagination from 'hooks/usePagination';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface PaginationProps {
  endpoint: string;
  lastIndex: number;
  count: number;
}

const Pagination = ({ endpoint, count, lastIndex }: PaginationProps) => {
  const id = Number(useParams().id);
  const { pageStartNumber, handleChange } = usePagination({
    endpoint,
    count,
    lastIndex,
  });

  return (
    <StyledRoot>
      <StyledPageIndicator onClick={handleChange(id - 1)}>이전</StyledPageIndicator>
      {Array.from({ length: count }, (_, index: number) => {
        const page = pageStartNumber + index + 1;
        const shouldShowPage = page <= lastIndex;

        if (!shouldShowPage) return null;

        return (
          <StyledPageIndicator key={index} selected={id === page} onClick={handleChange(page)}>
            {page}
          </StyledPageIndicator>
        );
      })}
      <StyledPageIndicator onClick={handleChange(id + 1)}>다음</StyledPageIndicator>
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
