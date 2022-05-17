import { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'Routers';

interface PaginationProps {
  count: number;
  lastIndex: number;
}

const usePagination = ({ count, lastIndex }: PaginationProps) => {
  const params = useParams();
  const id = Number(params.id);
  const [currentPage, setCurrentPage] = useState(id);
  const navigate = useNavigate();

  const pageStartNumber = Math.floor((currentPage - 1) / count) * count;

  const handleClickNumber = (page: number) => {
    setCurrentPage(page);
    navigate(PATH.getMain(page));
  };

  const handleClickPrev = () => {
    if (currentPage <= 1) return;
    const page = currentPage - 1;

    setCurrentPage(page);
    navigate(PATH.getMain(page));
  };

  const handleClickNext = () => {
    if (currentPage >= lastIndex) return;
    const page = currentPage + 1;

    setCurrentPage(page);
    navigate(PATH.getMain(page));
  };

  return {
    currentPage,
    pageStartNumber,
    handleClickNumber,
    handleClickPrev,
    handleClickNext,
  };
};

export default usePagination;
