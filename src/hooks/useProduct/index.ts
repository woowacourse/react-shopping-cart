import { useEffect, useState } from 'react';

import { Product } from '@Types/index';

const useProduct = (product: Product | undefined) => {
  const [name, setName] = useState<string>('로딩중입니다.');
  const [price, setPrice] = useState<string>('로딩중입니다.');
  const [image, setImage] = useState<string>();
  const [imageDescription, setImageDescription] = useState<string>();

  useEffect(() => {
    if (!product) return;

    setName(product.name);
    setPrice(`${product.price.toLocaleString()} 원`);
    setImage(product.imageUrl);
    setImageDescription(product.name);
  }, [product]);

  return { name, price, image, imageDescription };
};

export default useProduct;
