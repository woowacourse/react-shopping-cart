import * as S from './Card.styles';
import CartCount from './CartCount';
import Button from '../../../../common/Button';
import CheckBox from '../../../../common/CheckBox';
import Line from '../../../../common/Line';
import {CartProduct} from '../../../../../type/cart';
import {formatPrice} from '../../../../../utils/formatPrice';
import {css} from '@emotion/react';

type Props = {
  cartItem: CartProduct;
  interactive?: boolean;
  isChecked?: boolean;
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onPatch?: (id: number, quantity: number) => void;
};

const Card = ({
  cartItem,
  interactive = true,
  isChecked,
  onToggle,
  onDelete,
  onPatch,
}: Props) => {
  const {imageUrl, name, price} = cartItem.product;

  return (
    <S.CardContainer>
      {interactive && (
        <S.ButtonSection>
          <CheckBox
            isChecked={Boolean(isChecked)}
            onChange={() => onToggle?.(cartItem.id)}
          />
          <Button
            onClick={() => onDelete?.(cartItem.id)}
            title="삭제"
            css={css`
              width: 50px;
            `}
          />
        </S.ButtonSection>
      )}

      <S.CardInfoSection>
        <S.ImgSection
          src={imageUrl}
          alt={name}
          onError={(e) => (e.currentTarget.src = './null-image.png')}
        />
        <S.ProductInfoSection>
          <S.ProductDescription>
            <S.ProductName>{name}</S.ProductName>
            <S.ProductPrice>{formatPrice(price)}</S.ProductPrice>
          </S.ProductDescription>
          {interactive ? (
            <CartCount
              count={cartItem.quantity}
              onPlusCount={() => onPatch?.(cartItem.id, cartItem.quantity + 1)}
              onMinusCount={() => onPatch?.(cartItem.id, cartItem.quantity - 1)}
            />
          ) : (
            <div>{cartItem.quantity}개</div>
          )}
        </S.ProductInfoSection>
      </S.CardInfoSection>
      <Line />
    </S.CardContainer>
  );
};

export default Card;
