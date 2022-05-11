import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCT_LIST_PAGE_LIMIT } from '../../../api/constants';
import * as Styled from './Pagination.style';

const computePageCount = totalProductCount =>
  Math.ceil(totalProductCount / PRODUCT_LIST_PAGE_LIMIT);

function Pagination() {
  const totalProductCount = useSelector(state => state.totalProductCount);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? 1;

  return (
    <Styled.Container>
      <Styled.Inner>
        {Array.from({ length: computePageCount(totalProductCount) }).map((_, index) => (
          <Link key={index} to={`./?page=${index + 1}`}>
            <Styled.Button isCurrent={index + 1 === Number(currentPage)}>{index + 1}</Styled.Button>
          </Link>
        ))}
      </Styled.Inner>
    </Styled.Container>
  );
}

export default Pagination;
