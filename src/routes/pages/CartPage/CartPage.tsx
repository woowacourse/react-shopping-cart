import '../../../App.css';

import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import CartItem from '../../../components/CartItem/CartItem';
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
import { useNavigate } from 'react-router';
import { CartListStyle } from '../../../components/CartList/CartList.styles';
import CartListHeader from '../../../components/CartList/CartList';

function CartPage() {
  const cartList = useCartList();
  const selectedList = useSelect(cartList.data);
  const { isVisible, showToast } = useToastContext();
  const navigate = useNavigate();

  const totalPrice = cartPrice.totalPrice(
    cartList.data,
    selectedList.selectedItems
  );

  const selectedCartData = cartList.data.filter((item) =>
    selectedList.selectedItems.includes(item.id)
  );

  const handleOrderButtonClick = () => {
    navigate('/order-check', { state: { selectedCartData, totalPrice } });
  };

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
        <CartListHeader
          allSelected={selectedList.isAllSelected}
          onAllSelectChange={selectedList.handleSelectAllItems}
        />
        <ul css={CartListStyle}>
          {cartList.data.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              selected={selectedList.selectedItems.includes(cartItem.id)}
              onSelectChange={selectedList.handleSelectItem}
              onIncreaseClick={cartList.increaseCartItem}
              onDecreaseClick={cartList.decreaseCartItem}
              onDeleteClick={cartList.deleteCartItem}
            />
          ))}
        </ul>
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
        <CartListTitle count={cartList.data.length} />
        {cartList.isLoading ? <LoadingSpinner /> : renderCartList()}
      </ContainerLayout>
      <OrderButton
        onClick={handleOrderButtonClick}
        canOrder={selectedCartData.length > 0}
      />
    </>
  );
}

export default CartPage;
