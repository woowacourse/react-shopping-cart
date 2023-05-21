import { styled } from 'styled-components';
import { CartItemInfo } from '../../types';
import { useCart } from '../../hooks/useCart';
import { TrashCanIcon } from '../../assets/svg';
import Price from '../common/Price';
import Stepper from '../Stepper';
import { PRODUCT } from '../../constants';

interface Props {
  cartItemInfo: CartItemInfo;
  deleteCheckedItem: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function CartItem({ cartItemInfo, deleteCheckedItem }: Props) {
  const { name, price, imageUrl } = cartItemInfo.product;
  const { updateProductQuantity, deleteFromCart } = useCart(cartItemInfo.product);

  const handleDeleteCartItem = () => {
    deleteCheckedItem((prev) => prev.filter((itemId) => itemId !== cartItemInfo.id));
    deleteFromCart();
  };

  return (
    <Style.Container>
      <Style.ImageAndNameContainer>
        <Style.ProductImageWrapper>
          <Style.ProductImage src={imageUrl} alt={name} />
        </Style.ProductImageWrapper>
        <Style.ProductName htmlFor={`${name}-checkbox`}>{name}</Style.ProductName>
      </Style.ImageAndNameContainer>
      <Style.TrashCanIConAndStepperAndPriceContainer>
        <Style.DeleteCartItemButton
          onClick={handleDeleteCartItem}
          aria-label={`장바구니에서 ${name} 상품 삭제`}
        >
          <TrashCanIcon />
        </Style.DeleteCartItemButton>
        <Stepper
          quantity={cartItemInfo.quantity}
          minQuantity={1}
          maxQuantity={PRODUCT.MAX_COUNT}
          updateQuantity={updateProductQuantity}
        />
        <Price
          price={price * cartItemInfo?.quantity}
          label={`${name} ${cartItemInfo.quantity}개`}
        />
      </Style.TrashCanIConAndStepperAndPriceContainer>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      flex-direction: column;
      position: relative;
    }
  `,

  ImageAndNameContainer: styled.div`
    display: flex;
  `,

  ProductImageWrapper: styled.div`
    width: 130px;
    height: 130px;

    position: relative;
    overflow: hidden;
    margin-right: 20px;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 100px;
      height: 100px;
    }
  `,

  ProductImage: styled.img`
    width: 100%;
    height: 100%;

    position: absolute;
    object-fit: cover;
  `,

  ProductName: styled.label`
    width: 135px;

    font-size: 18px;
    color: var(--grey-400);

    cursor: pointer;

    /* 태블릿 */
    @media screen and (max-width: 991px) {
      width: 308px;
    }

    /* 모바일 */
    @media screen and (max-width: 767px) {
      width: 105px;
      margin-right: 25px;

      font-size: 14px;
    }
  `,

  TrashCanIConAndStepperAndPriceContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    width: 170px;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      flex-direction: row;
      justify-content: none;
      align-items: none;

      margin-top: 20px;
    }
  `,

  DeleteCartItemButton: styled.button`
    all: unset;

    cursor: pointer;

    /* 모바일 */
    @media screen and (max-width: 767px) {
      position: absolute;
      top: 0;
      right: 0;
    }
  `,
};
