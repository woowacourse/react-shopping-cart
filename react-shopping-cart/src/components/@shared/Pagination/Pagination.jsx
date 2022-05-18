import styled from 'styled-components';

import PaginationButton from 'components/@shared/PaginationButton/PaginationButton';

// 재사용O
function Pagination() {
  return (
    <Styled.Root>
      {Array.from({ length: 5 }).map((_, index) => {
        const pageNum = index + 1;

        return (
          <PaginationButton
            key={pageNum}
            pageNum={pageNum}
            to={`/${pageNum}`}
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
