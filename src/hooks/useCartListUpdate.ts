import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  countCartListSelector,
  countSelectedCartItemsSelector,
  deleteCartItemSelector,
  wholeCartITemToggleSelector,
} from 'src/recoil/cartList';

const useCartListUpdate = () => {
  const wholeCartItemsCount = useRecoilValue(countCartListSelector);
  const selectedCartItems = useRecoilValue(countSelectedCartItemsSelector);

  const setDeleteCartList = useSetRecoilState(deleteCartItemSelector);

  const [wholeSelected, setWholeSelected] = useRecoilState(
    wholeCartITemToggleSelector
  );

  useEffect(() => {
    setWholeSelected(true);
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    setWholeSelected(checked);
  };

  const onClickDeleteHandler: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    const selectedIds = selectedCartItems.map((item) => item.id);
    setDeleteCartList([...selectedIds]);
  };

  return {
    onChange,
    onClickDeleteHandler,
    wholeSelected,
    wholeCartItemsCount,
    selectedLength: selectedCartItems.length,
  };
};

export default useCartListUpdate;
