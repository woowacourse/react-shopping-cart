import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';
import Skeleton from 'components/Skeleton/Skeleton';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useAddCartItem from 'hooks/useAddCartItem';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';

const ProductList = () => {
  const {
    isLoading,
    isError,
    data: products,
    fetchData,
  } = useFetch({
    method: 'get',
    url: '/products',
  });

  const { addCarItem } = useAddCartItem();
  const isEmpty = products && !isLoading && products.length === 0;

  useEffect(() => {
    if (!products) {
      fetchData();
    }
  }, []);

  const handleClickCartButton = (id) => (e) => {
    e.stopPropagation();
    addCarItem(id);
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
