import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import Template from '../../components/shared/Template';
import useCart from '../../hooks/useCart';
import { FormEvent, useEffect, VFC } from 'react';
import ShoppingCartForm from '../../components/ShoppingCart/ShoppingCartForm';
import { useHistory } from 'react-router';

const TITLE = '장바구니';

const ShoppingCartPage: VFC = () => {
  const { fetchCartItems, totalPrice, checkedCartItems } = useCart();
  const history = useHistory();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onSubmitCartItems = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!checkedCartItems.length) return;

    history.push('/orderConfirm');
  };

  return (
    <Template title={TITLE}>
      <ShoppingCartForm onSubmit={onSubmitCartItems}>
        <ShoppingCartSectionList />
        <ShoppingCartResultSubmitCard
          totalPrice={totalPrice}
          totalQuantity={checkedCartItems.length}
        />
      </ShoppingCartForm>
    </Template>
  );
};

export default ShoppingCartPage;
