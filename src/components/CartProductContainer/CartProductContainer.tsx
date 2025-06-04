import deleteShoppingCart from '../../api/deleteShoppingCart';
import { CartItemTypes } from '../../types/cartItem';
import Button from '../Button/Button';
import { CartProduct } from '../CartProduct/CartProduct';
import { CheckBox } from '../CheckBox/CheckBox';
import { Line } from '../Line/Line';
import {
  CartItemBox,
  CartItemHeader,
  CartProductContainerLayout,
  CartProductList,
  SelectAllLayout,
} from './CartProductContainer.style';

interface CartProductContainerProps {
  cartItems: CartItemTypes[];
  onChange: () => void;
  onError: (message: string) => void;
  selectedCartIds: string[];
  setSelectedCartIds: (id: string[]) => void;
}

export default function CartProductContainer({
  cartItems,
  onChange,
  onError,
  selectedCartIds,
  setSelectedCartIds,
}: CartProductContainerProps) {
  const handleAllCheckBox = () => {
    if (selectedCartIds.length === cartItems.length) {
      setSelectedCartIds([]);
    } else {
      setSelectedCartIds(cartItems.map((item) => item.id.toString()));
    }
  };

  const handleCheckBox = (id: string) => {
    if (selectedCartIds.includes(id)) {
      setSelectedCartIds(selectedCartIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedCartIds([...selectedCartIds, id]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteShoppingCart(id);
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
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
