import { useRecoilState, useRecoilValue } from 'recoil';
import { cartListAtom, cartSelectedItemAtom } from 'src/recoil/atom';

const useCartListUpdate = () => {
  const [curSelected, setCurSelected] = useRecoilState(cartSelectedItemAtom);

  const cartList = useRecoilValue(cartListAtom);

  const checkItem: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked, id } = event.currentTarget;
    if (!checked) {
      setCurSelected(curSelected.filter((curId) => curId !== Number(id)));
      return;
    }

    setCurSelected([...curSelected, Number(id)]);
  };

  const currentIdIsChecked = (id: number) => {
    const curItem = curSelected.find((item) => item === id);

    if (!curItem) return false;

    return true;
  };

  const wholeChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    if (checked) {
      setCurSelected(cartList.map((item) => item.id));
      return;
    }
    setCurSelected([]);
  };

  const wholeSelected = curSelected.length > 0;

  const totalCartItemPrice = cartList.reduce((acc, cur) => {
    if (curSelected.includes(cur.id)) {
      return acc + cur.product.price * cur.quantity;
    }
    return acc;
  }, 0);

  return {
    cartList,
    wholeChange,
    checkItem,
    currentIdIsChecked,
    wholeSelected,
    selectedIds: curSelected,
    totalCartItemPrice,
  };
};

export default useCartListUpdate;
