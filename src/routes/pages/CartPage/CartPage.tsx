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

import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinning';
import { cartPrice } from '../../../utils/cartPrice';
import { useToastContext } from '../../../context/ToastContext';
import { useNavigate } from 'react-router';
import { CartListStyle } from '../../../components/CartList/CartList.styles';
import CartListHeader from '../../../components/CartList/CartList';
import { TEXT } from '../../../constants/text';
// import { useCartListContext } from '../../../context/CartListContext';
// import { useSelectedItemsContext } from '../../../context/SelectedItemsContext';
import { useCartContext } from '../../../context/CartContext';

function CartPage() {
  // const cartList = useCartListContext();
  // const selectedList = useSelectedItemsContext();
  const cart = useCartContext();
  const { isVisible } = useToastContext();
  const navigate = useNavigate();

  const totalPrice = cartPrice.totalPrice(cart.data, cart.selectedItems);

  const selectedCartData = cart.data.filter((item) =>
    cart.selectedItems.includes(item.id)
  );

  const handleOrderButtonClick = () => {
    navigate('/order-check');
  };

  const renderCartList = () => {
    return cart.data.length === 0 ? (
      <EmptyCart />
    ) : (
      <>
        <CartListHeader
          allSelected={cart.isAllSelected}
          onAllSelectChange={cart.handleSelectAllItems}
        />
        <ul css={CartListStyle}>
          {cart.data.map((cartItem) => (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              selected={cart.selectedItems.includes(cartItem.id)}
              onSelectChange={cart.handleSelectItem}
              onIncreaseClick={cart.increaseCartItem}
              onDecreaseClick={cart.decreaseCartItem}
              onDeleteClick={cart.deleteCartItem}
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
        <HeaderButton>
          <img src={Logo} alt="로고" />
        </HeaderButton>
      </Header>
      <ContainerLayout>
        {isVisible && <Toast message={cart.error} />}
        <CartListTitle
          title={TEXT.CART_TITLE}
          description={`현재 ${cart.data.length}종류의 상품이 담겨있습니다.`}
        />
        {cart.isLoading ? <LoadingSpinner /> : renderCartList()}
      </ContainerLayout>
      <OrderButton
        onClick={handleOrderButtonClick}
        canOrder={selectedCartData.length > 0}
      />
    </>
  );
}

export default CartPage;
