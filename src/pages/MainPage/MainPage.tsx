import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCardGrid from '../../components/ProductCardGrid/ProductCardGrid';
import Spinner from '../../components/Spinner/Spinner';
import useProductList from './useProductList';

function MainPage() {
  const navigate = useNavigate();
  const { isLoading, productList, error } = useProductList();

  useEffect(() => {
    if (error) {
      alert(error);
      navigate('/');
    }
  }, [error, navigate]);

  if (isLoading) return <Spinner />;

  return <ProductCardGrid productList={productList} />;
}

export default MainPage;
