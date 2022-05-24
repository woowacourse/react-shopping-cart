import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';
import Skeleton from 'components/Skeleton/Skeleton';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useFetch from 'hooks/useFetch';
import useCart from 'hooks/useCart';
import { METHOD } from 'constants';
import { useEffect } from 'react';

const ProductList = () => {
  const {
    isLoading,
    isError,
    data: products,
    fetchApi,
  } = useFetch({
    method: METHOD.GET,
    url: '/products',
  });

  const { addItem } = useCart();
  const isEmpty = products && !isLoading && products.length === 0;

  useEffect(() => {
    fetchApi();
  }, []);

  const handleClickCartButton = (id) => (e) => {
    e.stopPropagation();
    addItem(id);
  };

  if (isError) return <ImgWrapper src={errorApiImg} />;
  if (isEmpty) return <ImgWrapper src={emptyImg} />;
  if (isLoading)
    return (
      <ProductContainer>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} sizeType="small" />
        ))}
      </ProductContainer>
    );

  return (
    <ProductContainer>
      {products &&
        products.map(({ name, price, imgUrl, id }) => (
          <ProductItem
            id={id}
            name={name}
            price={price}
            imgUrl={imgUrl}
            key={id}
            onClickCartButton={handleClickCartButton(id)}
          />
        ))}
    </ProductContainer>
  );
};

export default ProductList;
