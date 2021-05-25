import produce from 'immer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLikeProduct } from '../redux/action';
import { ProductDetailType } from '../type';

const useLikedProducts = (products: { [key: string]: ProductDetailType }) => {
  const dispatch = useDispatch();
  const [likedProducts, setLikedProducts] = useState<{
    [key: string]: ProductDetailType;
  }>({});

  const onClickLikeButton = (productId: string) => {
    setLikedProducts(
      produce(likedProducts, (draft) => {
        if (products[productId].liked) {
          delete draft[productId];
        } else {
          draft[productId] = products[productId];
        }
      })
    );

    dispatch(toggleLikeProduct(products[productId]));
  };
  useEffect(() => {
    const result: {
      [key: string]: ProductDetailType;
    } = {};
    Object.values(products).forEach((product) => {
      if (product.liked) {
        result[product.product_id] = product;
      }
    });

    setLikedProducts(result);
  }, []);

  return { likedProducts, onClickLikeButton };
};

export default useLikedProducts;
