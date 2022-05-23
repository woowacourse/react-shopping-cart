import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';

const isActive = (idx, pageNum) => Number(idx) === pageNum;

// 재사용O
function Pagination() {
  const [searchParams] = useSearchParams();
  const idx = searchParams.get('page') ?? 1;

  return (
    <Styled.Root>
      {Array.from({ length: 5 }).map((_, index) => {
        const pageNum = index + 1;

        return (
          <PaginationButton
            key={pageNum}
            pageNum={pageNum}
            to={`?page=${pageNum}`}
            isActive={isActive(idx, pageNum)}
          />
        );
      })}
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    display: flex;
    gap: 15px;
  `,
};

export default Pagination;
