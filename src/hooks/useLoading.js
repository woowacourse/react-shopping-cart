import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../service/loading';

const useLoading = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading.loading.loading);

  const show = () => dispatch(showLoading());
  const timer = () => {
    setTimeout(() => dispatch(hideLoading()), 1000);
  };

  return { loading, show, timer };
};

export default useLoading;
