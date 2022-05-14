import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import * as Styled from './Pagination.style';

function Pagination() {
  const pageCount = useSelector(({ product }) => product.pageCount);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') ?? 1;

  return (
    <Styled.Container>
      <Styled.Inner>
        {Array.from({ length: pageCount }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Link key={index} to={`./?page=${pageNumber}`}>
              <Styled.Button isCurrent={pageNumber === Number(currentPage)}>
                {pageNumber}
              </Styled.Button>
            </Link>
          );
        })}
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Pagination;
