import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkProductCart } from 'store/action/cartActions';
import CheckBox from 'component/common/CheckBox';

export default function ProductCheckBox({ products }) {
  const dispatch = useDispatch();
  const [allCheck, setAllCheck] = useState(true);

  useEffect(() => {
    setAllCheck(products.every(product => product.checked));
  }, [products]);

  const handleAllCheck = () => {
    setAllCheck(!allCheck);
    products.forEach(product => dispatch(checkProductCart(product, !allCheck)));
  };

  return <CheckBox description="전체선택" onCheckChange={handleAllCheck} checked={allCheck} />;
}
