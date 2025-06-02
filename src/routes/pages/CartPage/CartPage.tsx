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
  const {
    cartList,
    isLoading,
    error,
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
  } = useCartList();

  const {
    selectedItems,
    isAllSelected,
    handleSelectItem,
    handleSelectAllItems,
  } = useSelect(cartList);

  const { isVisible, showToast } = useToastContext();

  const totalPrice = cartPrice.totalPrice(cartList, selectedItems);

  useEffect(() => {
    if (error) {
      showToast(error);
    }
  }, [error]);

  const renderCartList = () => {
    return cartList.length === 0 ? (
      <EmptyCart />
    ) : (
      <>
        <CartList
          isAllSelected={isAllSelected}
          handleSelectedAllItems={handleSelectAllItems}
        >
          {cartList.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              isSelected={selectedItems.includes(cartItem.id)}
              handleSelectItem={handleSelectItem}
              increaseCartItem={increaseCartItem}
              decreaseCartItem={decreaseCartItem}
              deleteCartItem={deleteCartItem}
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
      {isVisible && <Toast message={error} />}
      <ContainerLayout>
        <CartListTitle cartListLength={cartList.length} />
        {isLoading ? <LoadingSpinner /> : renderCartList()}
      </ContainerLayout>
      <OrderButton
        selectedCartData={cartList.filter((item) =>
          selectedItems.includes(item.id)
        )}
        totalPrice={totalPrice}
      />
    </>
  );
}

export default CartPage;
