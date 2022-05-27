import React from 'react';
import { useNavigate } from 'react-router-dom';

import Wrapper from './style';

import { PAGING } from 'constants';

const Pagenation = ({ endPoint, totalCount, currentPage, viewCount }) => {
  const navigate = useNavigate();
  const totalPage = Math.ceil(totalCount / viewCount);
  const group = Math.ceil(currentPage / PAGING.GROUP);
  const startPage = (group - 1) * PAGING.GROUP + 1;
  const endPage = Math.min(totalPage, startPage + PAGING.GROUP - 1);

  const handleClickPage = (page) => () => {
    if (page !== currentPage && page >= 1 && page <= totalPage) {
      navigate(`/${endPoint}/${page}`);
    }
  };

  return (
    <Wrapper>
      <div
        className={`page-item ${currentPage <= 1 ? '__disabled' : ''}`}
        onClick={handleClickPage(1)}
      >
        <p>{'<<'}</p>
      </div>
      <div
        className={`page-item ${currentPage <= 1 ? '__disabled' : ''}`}
        onClick={handleClickPage(startPage - 1)}
      >
        <p>{'<'}</p>
      </div>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <div
          className={`page-item ${currentPage === startPage + index ? '__disabled' : ''}`}
          key={startPage + index}
          onClick={handleClickPage(startPage + index)}
        >
          <p>{startPage + index}</p>
        </div>
      ))}
      <div
        className={`page-item ${currentPage >= totalPage ? '__disabled' : ''}`}
        onClick={handleClickPage(Math.min(totalPage, endPage + 1))}
      >
        <p>{'>'}</p>
      </div>
      <div
        className={`page-item ${currentPage >= totalPage ? '__disabled' : ''}`}
        onClick={handleClickPage(totalPage)}
      >
        <p>{'>>'}</p>
      </div>
    </Wrapper>
  );
};

export default Pagenation;
