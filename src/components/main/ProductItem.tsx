import { styled } from 'styled-components';
import QuantityInput from '../QuantityInput';
import { useRecoilValue } from 'recoil';
import { isSelectedProductSelector } from '../../store/CartSelector';
import CartIconButton from './CartIconButton';
import { useProduct } from '../../hooks/useProduct';
import useToast from '../../hooks/useToast';
import Toast from '../@common/Toast';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const isSelected = useRecoilValue(isSelectedProductSelector(id));
  const {
    newQuantity,
    handleBlurItem,
    addItemToCart,
    handleDecreaseItem,
    handleIncreaseItem,
    handleNumberInputChange,
  } = useProduct(id);

  const { isShowToast, showToast, dismissToast } = useToast();

  const handleCartClick = () => {
    addItemToCart();
    showToast();
  };

  return (
    <div>
      <S.Image src={imgUrl} alt={`img${id}`} />
      <S.InfoWrapper>
        <div>
          <S.Name htmlFor={`product${id}`}>{name}</S.Name>
          <S.Price>
            {price.toLocaleString()}
            <span>원</span>
          </S.Price>
        </div>
        {isSelected ? (
          <>
            <QuantityInput
              value={newQuantity}
              onChange={handleNumberInputChange}
              onIncrement={handleIncreaseItem}
              onDecrement={handleDecreaseItem}
              onBlur={handleBlurItem}
              id={`product${id}`}
            />
            <Toast
              isShowToast={isShowToast}
              message="상품이 장바구니에 담겼습니다."
              dismissToast={dismissToast}
            />
          </>
        ) : (
          <CartIconButton onClick={handleCartClick} ariaLabel={id} />
        )}
      </S.InfoWrapper>
    </div>
  );
};

const S = {
  Image: styled.img`
    width: 100%;
    height: auto;
  `,

  InfoWrapper: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12px 6px 0;

    & > button:last-child {
      cursor: pointer;
    }
  `,

  Name: styled.label`
    display: -webkit-box;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.5px;
    margin-right: 4px;
    color: var(--text-color);
    opacity: 0.9;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  `,

  Price: styled.p`
    margin-top: 8px;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: var(--text-color);

    & span {
      font-size: 17px;
      vertical-align: top;
    }
  `,
};

export default ProductItem;
