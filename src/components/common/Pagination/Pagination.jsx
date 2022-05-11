import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import * as Styled from './Pagination.style';

function Pagination() {
  const pageCount = useSelector(state => state.pageCount);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? 1;

  return (
    <Styled.Container>
      <Styled.Inner>
        {Array.from({ length: pageCount }).map((_, index) => (
          <Link key={index} to={`./?page=${index + 1}`}>
            <Styled.Button isCurrent={index + 1 === Number(currentPage)}>{index + 1}</Styled.Button>
          </Link>
        ))}
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Pagination;
