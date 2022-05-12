import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actions } from '../../actions/actions';
import { StoreState } from '../../types';

const useProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, productDetail } = useSelector((state: StoreState) => ({
    isLoading: state.isLoading,
    productDetail: state.productDetail,
  }));

  useLayoutEffect(() => {
    if (id) {
      dispatch(actions.getProductDetail(id));
    }
  }, [id, dispatch]);

  return { isLoading, productDetail };
};

export default useProductPage;
