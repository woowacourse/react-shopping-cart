import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';

//TODO: 네이밍
const isActive = (idx, pageNum) => Number(idx) === pageNum;

// 재사용O
function Pagination() {
  const { idx } = useParams();

  return (
    <Styled.Root>
      {Array.from({ length: 5 }).map((_, index) => {
        const pageNum = index + 1;

        return (
          <PaginationButton
            key={pageNum}
            pageNum={pageNum}
            to={`/${pageNum}`}
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
