import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/actions';
import { StoreState } from '../../types';

const useProductDetail = (id: string | undefined) => {
  const dispatch = useDispatch();
  const { isLoading, productDetail, error } = useSelector(
    (state: StoreState) => ({
      isLoading: state.isLoading,
      productDetail: state.productDetail,
      error: state.error,
    })
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  return { isLoading, productDetail, error };
};

export default useProductDetail;
