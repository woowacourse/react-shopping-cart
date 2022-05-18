import { useState, MouseEvent, useEffect } from 'react';
import { render } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Paginator = ({ maxIndex }: { maxIndex: number }) => {
  const params = useParams();
  const id = Number(params.id);
  const [page, setPage] = useState(id);
  const navigate = useNavigate();

  const pageStartNumber = Math.floor((page - 1) / 10) * 10;
  const pageLastNumber = Math.floor(maxIndex / 12) + 1;

  const handleClickNumber = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const currentPage = Number(e.target.innerText);

    setPage(currentPage);
    navigate(`/main/${currentPage}`);
  };

  const handleClickBefore = () => {
    if (page <= 1) return;
    const currentPage = page - 1;

    setPage(currentPage);
    navigate(`/main/${currentPage}`);
  };

  const handleClickAfter = () => {
    if (page >= pageLastNumber) return;
    const currentPage = page + 1;

    setPage(currentPage);
    navigate(`/main/${currentPage}`);
  };

  return (
    <StyledRoot>
      <StyledPageIndicator onClick={handleClickBefore}>이전</StyledPageIndicator>
      {Array.from({ length: 10 }, (_, index: number) => {
        if (pageStartNumber + index + 1 <= pageLastNumber) {
          return (
            <StyledPageIndicator
              key={index}
              active={page === pageStartNumber + index + 1}
              onClick={handleClickNumber}
            >
              {pageStartNumber + index + 1}
            </StyledPageIndicator>
          );
        }
      })}
      <StyledPageIndicator onClick={handleClickAfter}>다음</StyledPageIndicator>
    </StyledRoot>
  );
};

export default Paginator;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 5rem;
`;

const StyledPageIndicator = styled.button<{ active?: boolean }>`
  ${({ active, theme }) =>
    active &&
    css`
      color: ${theme.colors.primary};
      font-weight: 700;
    `}

  font-size: 3rem
`;
