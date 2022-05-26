import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { productCountSelector } from 'store/selector';

import * as Styled from 'components/common/Pagination/Pagination.style';

function Pagination() {
  const pageCount = useSelector(productCountSelector);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;

  return (
    <Styled.Container>
      <Styled.Inner>
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNumber = index + 1;
          const isCurrent = pageNumber === Number(currentPage);

          return (
            <Styled.CustomLink
              key={index}
              to={`./?page=${pageNumber}`}
              $isCurrent={isCurrent}
            >
              <Styled.Button $isCurrent={isCurrent}>{pageNumber}</Styled.Button>
            </Styled.CustomLink>
          );
        })}
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Pagination;
