import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../service/loading';

const useLoading = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading.loading.loading);

  const show = () => dispatch(showLoading());
  const timer = () => setTimeout(() => dispatch(hideLoading()), 1000);

  useEffect(() => {
    if (loading === false) return;
    timer();

    return clearTimeout(timer());
  }, [loading]);

  return { loading, show, timer };
};

export default useLoading;
