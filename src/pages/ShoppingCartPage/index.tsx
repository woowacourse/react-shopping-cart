import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import Template from '../../components/shared/Template';
import useCart from '../../hooks/useCart';
import { FormEvent, useEffect, VFC } from 'react';
import ShoppingCartForm from '../../components/ShoppingCart/ShoppingCartForm';
import { useHistory } from 'react-router';

const TITLE = '장바구니';

const ShoppingCartPage: VFC = () => {
  const { fetchCartItems, CartItems: items } = useCart();
  const history = useHistory();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = items.reduce(
    (acc, { price, quantity, checked }) => (checked ? acc + price * quantity : acc),
    0
  );

  const onSubmitCartItems = async (event: FormEvent<HTMLFormElement>) => {
    const checkedItems = items.filter((item) => item.checked).length;
    event.preventDefault();

    if (!checkedItems) return;

    history.push('/orderConfirm');
  };

  return (
    <Template title={TITLE}>
      <ShoppingCartForm onSubmit={onSubmitCartItems}>
        <ShoppingCartSectionList />
        <ShoppingCartResultSubmitCard
          totalPrice={totalPrice}
          totalQuantity={items.filter((item) => item.checked).length}
        />
      </ShoppingCartForm>
    </Template>
  );
};

export default ShoppingCartPage;
