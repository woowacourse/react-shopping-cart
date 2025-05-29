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

import { Logo } from '../../../assets';
import { cartPrice } from '../../../utils/cartPrice/cartPrice';

import useCartList from '../../../hooks/useCartList';
import useSelect from '../../../hooks/useSelect';
import LoadingSpinner from '../../../components/common/LoadingSpinner/LoadingSpinning';

function CartPage() {
  const {
    cartList,
    isError,
    isLoading,
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

  console.log('isLoading', isLoading);

  const totalPrice = cartPrice.totalPrice(cartList, selectedItems);

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
        <HeaderButton src={Logo} onClick={() => {}} />
      </Header>
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
