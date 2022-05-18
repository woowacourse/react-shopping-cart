import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { productSelector } from '../../../store/selector';
import * as Styled from './Pagination.style';

function Pagination() {
  const product = useSelector(productSelector);

  const pageCount = useMemo(() => product.pageCount, [product]);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;

  return (
    <Styled.Container>
      <Styled.Inner>
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNumber = index + 1;
          const isCurrent = pageNumber === Number(currentPage);

          return (
            <Styled.CustomLink key={index} to={`./?page=${pageNumber}`} $isCurrent={isCurrent}>
              <Styled.Button $isCurrent={isCurrent}>{pageNumber}</Styled.Button>
            </Styled.CustomLink>
          );
        })}
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Pagination;
