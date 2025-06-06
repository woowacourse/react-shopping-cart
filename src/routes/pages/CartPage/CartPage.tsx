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

import useSelect from '../../../hooks/useSelect';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinning';
import { cartPrice } from '../../../utils/cartPrice';
import { useToastContext } from '../../../context/ToastContext';
import { useNavigate } from 'react-router';
import { CartListStyle } from '../../../components/CartList/CartList.styles';
import CartListHeader from '../../../components/CartList/CartList';
import { TEXT } from '../../../constants/text';
import { useCartListContext } from '../../../context/CartListContext';

function CartPage() {
  const cartList = useCartListContext();
  const selectedList = useSelect(cartList.data);
  const { isVisible } = useToastContext();
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
        <HeaderButton>
          <img src={Logo} alt="로고" />
        </HeaderButton>
      </Header>
      <ContainerLayout>
        {isVisible && <Toast message={cartList.error} />}
        <CartListTitle
          title={TEXT.CART_TITLE}
          description={`현재 ${cartList.data.length}종류의 상품이 담겨있습니다.`}
        />
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
