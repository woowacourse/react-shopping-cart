import Styled from './style';
import CartContainer from 'components/CartContainer/CartContainer';
import CartItem from 'components/CartItem/CartItem';
import CartControlBar from 'components/CartControlBar/CartControlBar';
import Title from 'components/Title/Title';
import PaymentBox from 'components/PaymentBox/PaymentBox';

import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';
import errorApiImg from 'assets/png/errorApiImg.png';
import useCartPage from 'hooks/pages/useCartPage';
import itemAltImg from 'assets/png/itemAltImg.png';
import { isInList } from 'utils';

const Cart = () => {
  const {
    isLoading,
    isError,
    cartItems,
    totalPrice,
    selectedItemList,
    handleToggleSelectAll,
    handleToggleSelect,
    handleDeleteSelectedItem,
    handleDeleteItem,
    handleUpdateItemQuantity,
  } = useCartPage();

  return (
    <Styled.Wrapper>
      <Title contents="장바구니" />
      {isLoading && <ImgWrapper src={spinner} />}
      {isError && <ImgWrapper src={errorApiImg} />}
      <Styled.ContentsWrapper>
        <Styled.CartContents>
          <CartControlBar
            isAllSelected={
              selectedItemList.length === cartItems?.length &&
              cartItems?.length > 0
            }
            onToggleSelect={handleToggleSelectAll(
              selectedItemList.length === cartItems?.length,
            )}
            onClickDeleteButton={handleDeleteSelectedItem}
          />

          <CartContainer>
            {cartItems &&
              cartItems.map(({ id, name, imgUrl, price, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  imgUrl={imgUrl || itemAltImg}
                  price={price}
                  quantity={quantity}
                  isSelected={isInList(selectedItemList, id)}
                  onToggleSelect={handleToggleSelect(id)}
                  onChangeQuantity={handleUpdateItemQuantity(id)}
                  onDeleteItem={handleDeleteItem(id)}
                />
              ))}
          </CartContainer>
        </Styled.CartContents>
        <Styled.PaymentBoxWrapper>
          <PaymentBox quantity={selectedItemList.length} price={totalPrice} />
        </Styled.PaymentBoxWrapper>
      </Styled.ContentsWrapper>
    </Styled.Wrapper>
  );
};

export default Cart;
