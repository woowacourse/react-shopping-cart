import deleteShoppingCart from '../../../api/deleteShoppingCart';
import { CartItemTypes } from '../../../types/cartItem';
import { Button, CheckBox, Line, CartProduct } from '../../../components';
import { CartItemHeader, SelectAllLayout } from './CartProductContainer.style';
import { SELECTED_CART_ITEM_IDS, setItem } from '../../../utils/localStorage';
import {
  CartItemBox,
  CartProductContainerLayout,
  CartProductList,
} from '../SelectedCartProductContainer';

interface CartProductContainerProps {
  cartItems: CartItemTypes[];
  onChange: () => void;
  onError: (message: string) => void;
  selectedCartIds: string[];
  setSelectedCartIds: (id: string[]) => void;
  isFetching: boolean;
}

export function CartProductContainer({
  cartItems,
  onChange,
  onError,
  selectedCartIds,
  setSelectedCartIds,
  isFetching,
}: CartProductContainerProps) {
  const handleAllCheckBox = () => {
    if (selectedCartIds.length === cartItems.length) {
      setSelectedCartIds([]);
      setItem(SELECTED_CART_ITEM_IDS, []);
    } else {
      const ids = cartItems.map((item) => item.id.toString());
      setSelectedCartIds(ids);
      setItem(SELECTED_CART_ITEM_IDS, ids);
    }
  };

  const handleCheckBox = (id: string) => {
    if (selectedCartIds.includes(id)) {
      const ids = selectedCartIds.filter((itemId) => itemId !== id);
      setSelectedCartIds(ids);
      setItem(SELECTED_CART_ITEM_IDS, ids);
    } else {
      const ids = [...selectedCartIds, id];
      setSelectedCartIds(ids);
      setItem(SELECTED_CART_ITEM_IDS, ids);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteShoppingCart(id);
      const ids = selectedCartIds.filter((itemId) => itemId !== id.toString());
      setSelectedCartIds(ids);
      setItem(SELECTED_CART_ITEM_IDS, ids);
      onChange();
    } catch (error) {
      onError('삭제에 실패했습니다');
    }
  };

  return (
    <>
      <div css={CartProductContainerLayout}>
        <div css={SelectAllLayout}>
          <CheckBox
            isChecked={
              selectedCartIds.length === cartItems.length &&
              cartItems.length !== 0
            }
            dataTestId="select-all"
            id="select-all"
            onChange={handleAllCheckBox}
          />
          <label htmlFor="select-all">전체 선택</label>
        </div>
        <section css={CartProductList}>
          {cartItems.map((item) => {
            return (
              <div css={CartItemBox} key={item.id}>
                <Line />
                <div css={CartItemHeader}>
                  <CheckBox
                    dataTestId={`select-${item.id}`}
                    isChecked={selectedCartIds.includes(item.id.toString())}
                    onChange={handleCheckBox}
                    id={item.id.toString()}
                  />
                  <Button onClick={() => handleDelete(item.id)} style="ghost">
                    삭제
                  </Button>
                </div>
                <CartProduct
                  id={item.id}
                  imageUrl={item.product.imageUrl}
                  name={item.product.name}
                  price={item.product.price}
                  quantity={item.quantity}
                  onChange={onChange}
                  isFetching={isFetching}
                  mode="control"
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
