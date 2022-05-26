import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'Routers';

interface PaginationProps {
  count: number;
  lastIndex: number;
}

const usePagination = ({ count, lastIndex }: PaginationProps) => {
  const id = Number(useParams().id);
  const navigate = useNavigate();

  const pageStartNumber = Math.floor((id - 1) / count) * count;

  const handleChange = (page: number) => () => {
    if (page === id || page < 1 || page > lastIndex) return;
    navigate(PATH.getMain(page));
  };

  return {
    pageStartNumber,
    handleChange,
  };
};

export default usePagination;
