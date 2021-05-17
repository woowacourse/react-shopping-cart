import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetchCartRedux from '../../hooks/useFetchCartRedux';
import { FormEvent, useEffect, FC } from 'react';
import ShoppingCartForm from '../../components/ShoppingCart/ShoppingCartForm';
import { requestRegisterOrderConfirmItems } from '../../service/request/orderConfirm';
import { useHistory } from 'react-router';

const TITLE = '장바구니';

const ShoppingCartPage: FC = () => {
  const { fetchCartItemRedux, itemsInCart: items } = useFetchCartRedux();
  const history = useHistory();

  useEffect(() => {
    fetchCartItemRedux();
  }, []);

  const totalPrice = items.reduce(
    (acc, { price, quantity, checked }) => (checked ? acc + price * quantity : acc),
    0
  );

  const onSubmitCartItems = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await requestRegisterOrderConfirmItems(items.filter(({ checked }) => checked));
    } catch (error) {
      throw error;
    }

    if (!history) return;

    history.push('/orderConfirm');
  };

  return (
    <ReactShoppingCartTemplate title={TITLE}>
      <ShoppingCartForm onSubmit={onSubmitCartItems}>
        <ShoppingCartSectionList />
        <ShoppingCartResultSubmitCard
          totalPrice={totalPrice}
          totalQuantity={items.filter((item) => item.checked).length}
        />
      </ShoppingCartForm>
    </ReactShoppingCartTemplate>
  );
};

export default ShoppingCartPage;
