import produce from 'immer';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLikeProduct } from '../redux/action';
import { ProductDetailType } from '../type';

const useLikedProducts = (products: { [key: string]: ProductDetailType }) => {
  const dispatch = useDispatch();
  const [likedProducts, setLikedProductList] = useState<{
    [key: string]: ProductDetailType;
  }>({});

  const onClickLikeButton = (productId: string) => {
    if (products[productId].liked) {
      setLikedProductList(
        produce(likedProducts, (draft) => {
          delete draft[productId];
        })
      );
    } else {
      setLikedProductList(
        produce(likedProducts, (draft) => {
          draft[productId] = products[productId];
        })
      );
    }
    dispatch(toggleLikeProduct(products[productId]));
  };
  useEffect(() => {
    const result: {
      [key: string]: ProductDetailType;
    } = {};
    Object.values(products).forEach((product) => {
      if (product.liked) {
        likedProducts[product.product_id] = product;
      }
    });

    setLikedProductList(result);
  }, []);

  return { likedProducts, onClickLikeButton };
};

export default useLikedProducts;
