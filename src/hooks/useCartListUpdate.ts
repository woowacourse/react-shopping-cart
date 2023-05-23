import { useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartListAtom } from 'src/recoil/atom';
import { selectedCartItemSelector } from 'src/recoil/selector';

const useCartListUpdate = () => {
  const [curSelected, setCurSelected] = useRecoilState(
    selectedCartItemSelector
  );

  const cartList = useRecoilValue(cartListAtom);

  const checkItem: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked, id } = event.currentTarget;
    const updated = curSelected.map((item) =>
      item.id === Number(id) ? { ...item, checked } : item
    );
    setCurSelected(updated);
  };

  const currentIdIsChecked = (id: number) => {
    const curItem = curSelected.find((item) => item.id === id);

    if (!curItem) return false;

    return curItem.checked;
  };

  const wholeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    const updated = curSelected.map((item) => ({ ...item, checked }));
    setCurSelected(updated);
  };

  const wholeSelected = curSelected.every((item) => item.checked);
  const selectedIds = curSelected
    .filter((item) => item.checked)
    .map((item) => item.id);

  const totalCartItemPrice = useMemo(() => {
    return curSelected.reduce((acc, cur) => {
      if (cur.checked) {
        return acc + cur.price;
      }

      return acc;
    }, 0);
  }, [curSelected]);

  return {
    cartList,
    wholeChange,
    checkItem,
    currentIdIsChecked,
    wholeSelected,
    selectedIds,
    totalCartItemPrice,
  };
};

export default useCartListUpdate;
