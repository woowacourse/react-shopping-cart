import { useEffect } from 'react';
import PageHeader from '../../@common/PageHeader';
import PaymentSheet from '../../PaymentSheet';
import ShoppingItem from '../../ShoppingItem';
import CheckBox from '../../@common/CheckBox';
import Button from '../../@common/Button';
import {
  Main,
  Controller,
  CheckBoxWrapper,
  ShoppingList,
} from './index.styles';
import PageWrapper from '../../@common/PageWrapper';
import useCarts from '../../../hooks/useCarts';

const ShoppingCart = () => {
  const {
    cartItems,
    orderButtonText,
    isCheckedAll,
    checkedItems,
    formattedTotalPrice,
    updateIncreaseQuantity,
    updateDecreaseQuantity,
    updateCartURL,
    updateCarts,
    routeToOrderPayment,
    toggleCheckBox,
    deleteItem,
  } = useCarts();

  useEffect(() => {
    updateCartURL();

    if (cartItems.length === 0) updateCarts();
  }, []);

  return (
    <PageWrapper>
      <PageHeader>장바구니</PageHeader>
      <Main>
        <div>
          <Controller>
            <CheckBoxWrapper>
              <CheckBox
                isChecked={isCheckedAll}
                onCheckBoxClick={() => toggleCheckBox()}
              />
              <span>
                전체선택
                {`(${checkedItems.length}/${cartItems.length})`}
              </span>
            </CheckBoxWrapper>
            <Button onClick={() => deleteItem()}>상품삭제</Button>
          </Controller>
          <ShoppingList>
            <div>배송 상품</div>
            <ul>
              {Object.values(cartItems).map(({ product_id, ...product }) => (
                <li key={product_id}>
                  <ShoppingItem
                    {...product}
                    onIncreaseQuantity={() =>
                      updateIncreaseQuantity(product_id)
                    }
                    onDecreaseQuantity={() =>
                      updateDecreaseQuantity(product_id)
                    }
                    onCheckBoxClick={() => toggleCheckBox(product_id)}
                    onDeleteButtonClick={() => deleteItem(product_id)}
                  />
                </li>
              ))}
            </ul>
          </ShoppingList>
        </div>
        <PaymentSheet
          title="결제예상금액"
          priceInfo="결제예상금액"
          price={formattedTotalPrice}
          buttonText={`${orderButtonText}`}
          onButtonClick={routeToOrderPayment}
        />
      </Main>
    </PageWrapper>
  );
};

export default ShoppingCart;
