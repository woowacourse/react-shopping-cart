import { Routes, Route, Navigate } from 'react-router-dom';
import ProductDetail from './ProductDetail.page';
import PATH from 'constants/path';

export default {
  title: 'Pages/ProductDetail',
  component: ProductDetail,
};

const PRODUCT_DETAIL_PATH = '/product/detail/1';

export const PassProductInfo = args => {
  return (
    <Routes>
      <Route path={PATH.PRODUCT_DETAIL} element={<ProductDetail />} />
      <Route path={PATH.NOT_FOUND} element={<Navigate to={PRODUCT_DETAIL_PATH} />} />
    </Routes>
  );
};
