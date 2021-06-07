import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import { FormEvent, useEffect, FC } from 'react';
import ShoppingCartForm from '../../components/ShoppingCart/ShoppingCartForm';
import { useHistory } from 'react-router';
import InitialLoading from '../../components/shared/InitialLoading';
import useCartItems from '../../hooks/useCartItems';
import { ALERT } from '../../constants/message';
import { setOrderConfirmItemsInLocalStorage } from '../../service/localstorage/orderConfirm';

const TITLE = '장바구니';

const ShoppingCartPage: FC = () => {
  const { loadCartItems, itemsInCart: items, isLoading } = useCartItems();
  const history = useHistory();

  useEffect(() => {
    loadCartItems();
  }, []);

  const totalPrice = items.reduce(
    (acc, { price, quantity, checked }) => (checked ? acc + price * quantity : acc),
    0
  );

  const onSubmitCartItems = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const checkedItem = items.filter(({ checked }) => checked);

    if (checkedItem.length === 0) {
      alert(ALERT.NONE_OF_SELECTED_ITEMS);
      return;
    }

    setOrderConfirmItemsInLocalStorage(checkedItem);

    if (!history) return;

    history.push('/orderConfirm');
  };

  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <InitialLoading isLoading={isLoading}>
        <ShoppingCartForm onSubmit={onSubmitCartItems}>
          <ShoppingCartSectionList />
          <ShoppingCartResultSubmitCard
            totalPrice={totalPrice}
            totalQuantity={items.filter((item) => item.checked).length}
          />
        </ShoppingCartForm>
      </InitialLoading>
    </ReactShoppingCartTemplate>
  );
};

export default ShoppingCartPage;
