import '../../../App.css';

import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import CartItem from '../../../components/CartItem/CartItem';
import CartList from '../../../components/CartList/CartList';
import CartPriceInfo from '../../../components/CartPriceInfo/CartPriceInfo';
import OrderButton from '../../../components/OrderButton/OrderButton';
import EmptyCart from '../../../components/EmptyCart/EmptyCart';
import Toast from '../../../components/common/Toast/Toast';

import { Logo } from '../../../assets';

import useCartList from '../../../hooks/useCartList';
import useSelect from '../../../hooks/useSelect';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinning';
import { cartPrice } from '../../../utils/cartPrice';
import { useEffect } from 'react';
import { useToastContext } from '../../../context/ToastContext';

function CartPage() {
  const cartList = useCartList();
  const selectedList = useSelect(cartList.data);

  const { isVisible, showToast } = useToastContext();

  const totalPrice = cartPrice.totalPrice(
    cartList.data,
    selectedList.selectedItems
  );

  useEffect(() => {
    if (cartList.error) {
      showToast(cartList.error);
    }
  }, [cartList.error]);

  const renderCartList = () => {
    return cartList.data.length === 0 ? (
      <EmptyCart />
    ) : (
      <>
        <CartList
          isAllSelected={selectedList.isAllSelected}
          handleSelectedAllItems={selectedList.handleSelectAllItems}
        >
          {cartList.data.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              isSelected={selectedList.selectedItems.includes(cartItem.id)}
              handleSelectItem={selectedList.handleSelectItem}
              increaseCartItem={cartList.increaseCartItem}
              decreaseCartItem={cartList.decreaseCartItem}
              deleteCartItem={cartList.deleteCartItem}
            />
          ))}
        </CartList>
        <CartPriceInfo totalPrice={totalPrice} />
      </>
    );
  };

  return (
    <>
      <Header>
        <HeaderButton src={Logo} />
      </Header>
      {isVisible && <Toast message={cartList.error} />}
      <ContainerLayout>
        <CartListTitle cartListLength={cartList.data.length} />
        {cartList.isLoading ? <LoadingSpinner /> : renderCartList()}
      </ContainerLayout>
      <OrderButton
        selectedCartData={cartList.data.filter((item) =>
          selectedList.selectedItems.includes(item.id)
        )}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default CartPage;
