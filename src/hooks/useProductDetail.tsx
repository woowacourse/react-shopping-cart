import React, { useState } from 'react';
import useAppDispatch from 'hooks/useAppDispatch';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductData } from 'types';

const useProductDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductData | null>(null);

  const productId = Number(params.id);

  return { dispatch, navigate, data: { productId, product, setProduct } };
};

export default useProductDetail;
