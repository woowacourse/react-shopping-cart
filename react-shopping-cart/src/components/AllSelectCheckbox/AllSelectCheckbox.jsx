import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import CheckBox from 'components/@shared/CheckBox/CheckBox';
import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

import { allToggleIsChecked } from 'redux/carts/carts.action';

//재사용O
function AllSelectCheckbox({ carts }) {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const handleChangeCheckBox = () => {
    setChecked((prev) => !prev);
    dispatch(allToggleIsChecked(checked));
  };

  useEffect(() => {
    const isAllchecked = () => {
      const checkedProducts = carts.filter((cart) => cart.checked);
      const checkedProductsLength = checkedProducts.length;

      return (
        carts.length !== checkedProductsLength || checkedProductsLength === 0
      );
    };

    if (isAllchecked()) {
      setChecked(false);
    }
  }, [carts]);

  return (
    <FlexWrapper gap="10px">
      <CheckBox checked={checked} onChange={handleChangeCheckBox} />
      <div>{checked ? '전체선택' : '선택해제'}</div>
    </FlexWrapper>
  );
}

export default AllSelectCheckbox;
