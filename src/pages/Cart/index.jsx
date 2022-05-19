import Styled from './style';
import CartContainer from 'components/CartContainer/CartContainer';
import CartItem from 'components/CartItem/CartItem';
import CartControlBar from 'components/CartControlBar/CartControlBar';
import Title from 'components/Title/Title';
import PaymentBox from 'components/PaymentBox/PaymentBox';
import { useState, useMemo } from 'react';
import useCart from 'hooks/useCart';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';
import errorApiImg from 'assets/png/errorApiImg.png';

const Cart = () => {
  const { isLoading, isError, data } = useCart();
  const [selectedItemList, setSelectedItemList] = useState([]);

  const totalPrice = useMemo(() => {
    if (!data || data.length === 0) return 0;
    const list = data.filter(({ id }) => selectedItemList.indexOf(id) !== -1);
    return list.reduce(
      (prev, { price, quantity }) => (prev += Number(price) * quantity),
      0,
    );
  }, [data, selectedItemList]);

  const handleToggleSelectAll = (isSelected) => () => {
    if (isSelected) {
      setSelectedItemList([]);
      return;
    }
    setSelectedItemList(data.map(({ id }) => id));
  };

  const handleToggleSelect = (id) => () => {
    if (selectedItemList.indexOf(id) === -1) {
      setSelectedItemList([...selectedItemList, id]);
      return;
    }
    setSelectedItemList(selectedItemList.filter((itemId) => itemId !== id));
  };
  return (
    <Styled.Wrapper>
      <Title contents="장바구니" />
      {isLoading && <ImgWrapper src={spinner} />}
      {isError && <ImgWrapper src={errorApiImg} />}
      {data && data?.length > 0 ? (
        <Styled.ContentsWrapper>
          <div>
            <CartControlBar
              isAllSelected={selectedItemList.length === data.length}
              onToggleSelect={handleToggleSelectAll(
                selectedItemList.length === data.length,
              )}
            />

            <CartContainer>
              {data.map(({ id, name, imgUrl, price, quantity }) => (
                <CartItem
                  key={id}
                  id={id}
                  name={name}
                  imgUrl={imgUrl}
                  price={price}
                  quantity={quantity}
                  isSelected={selectedItemList.indexOf(id) !== -1}
                  onToggleSelect={handleToggleSelect(id)}
                />
              ))}
            </CartContainer>
          </div>
          <Styled.PaymentBoxWrapper>
            <PaymentBox quantity={selectedItemList.length} price={totalPrice} />
          </Styled.PaymentBoxWrapper>
        </Styled.ContentsWrapper>
      ) : (
        <div>비어있음</div>
      )}
    </Styled.Wrapper>
  );
};

export default Cart;
