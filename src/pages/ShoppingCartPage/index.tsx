import ShoppingCartSectionList from '../../components/ShoppingCart/ShoppingCartSectionList';
import ShoppingCartResultSubmitCard from '../../components/ShoppingCart/ShoppingCartResultSubmitCard';
import ReactShoppingCartTemplate from '../../components/shared/ReactShoppingCartTemplate';
import useFetchCartRedux from '../../hooks/useFetchCartRedux';
import { FormEvent, useEffect, VFC } from 'react';
import ShoppingCartForm from '../../components/ShoppingCart/ShoppingCartForm';
import { requestRegisterOrderConfirmItems } from '../../service/request/orderConfirm';
import { RouteComponentProps } from 'react-router';
import { NETWORK_ERROR } from '../../constants/error';
import { KRCurrency } from '../../utils/format';

const TITLE = '장바구니';

interface Props extends RouteComponentProps {}

const ShoppingCartPage: VFC<Props> = ({ history }) => {
  const { doFetch, itemsInCart: items } = useFetchCartRedux();

  useEffect(() => {
    doFetch();
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

    if (history) {
      history.push('/orderConfirm');
    }
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
