import { useNavigate, useParams } from 'react-router-dom';

interface PaginationProps {
  endpoint: string;
  count: number;
  lastIndex: number;
}

const usePagination = ({ endpoint, count, lastIndex }: PaginationProps) => {
  const id = Number(useParams().id);
  const navigate = useNavigate();

  const pageStartNumber = Math.floor((id - 1) / count) * count;

  const handleChange = (page: number) => () => {
    if (page === id || page < 1 || page > lastIndex) return;
    navigate(`/${endpoint}/${page}`);
  };

  return {
    pageStartNumber,
    handleChange,
  };
};

export default usePagination;
