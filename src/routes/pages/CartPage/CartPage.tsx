import '../../../App.css';

import Header from '../../../components/common/Header/Header';
import HeaderButton from '../../../components/common/Header/HeaderButton';
import ContainerLayout from '../../../components/common/ContainerLayout/ContainerLayout';
import CartListTitle from '../../../components/CartListTitle/CartListTitle';
import CartItem from '../../../components/CartItem/CartItem';
import CartPriceInfo from '../../../components/CartPriceInfo/CartPriceInfo';
import EmptyCart from '../../../components/EmptyCart/EmptyCart';
import Toast from '../../../components/common/Toast/Toast';

import { Logo } from '../../../assets';

import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinning';
import { useToastContext } from '../../../context/ToastContext';
import { useNavigate } from 'react-router';
import { CartListStyle } from '../../../components/CartList/CartList.styles';
import CartListHeader from '../../../components/CartList/CartList';
import { TEXT } from '../../../constants/text';
import { useCartContext } from '../../../context/CartContext';
import Button from '../../../components/common/Button/Button';
import Text from '../../../components/common/Text/Text';

function CartPage() {
  const cart = useCartContext();
  const { isVisible } = useToastContext();
  const navigate = useNavigate();

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
        <CartPriceInfo
          subTotal={cart.subTotal}
          deliveryFee={cart.deliveryFee}
          totalBeforeDiscount={cart.totalBeforeDiscount}
        />
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
      <Button
        color="black"
        variant="primary"
        onClick={handleOrderButtonClick}
        disabled={selectedCartData.length <= 0}
      >
        <Text varient="body">주문 확인</Text>
      </Button>
    </>
  );
}

export default CartPage;
