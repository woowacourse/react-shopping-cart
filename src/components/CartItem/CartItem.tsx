import styled from '@emotion/styled';
import { Product } from '../../type';
import QuantityController from '../QuantityController/QuantityController';
import CheckBox from '../CheckBox/CheckBox';
import SmallButton from '../SmallButton/SmallButton';
import convertToLocaleAmount from '../../utils/convertToLocalePrice';
import { itemQuantityState, isCheckedItemIdsState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import useCheckedItemIds from '../../hooks/useCheckedItemIds';

interface CartItemProps {
  cartItemId: number;
  product: Product;
  quantity: number;
  handleDelete: (cartItemId: number) => void;
  handleIncreaseQuantity: (cartItemId: number, quantity: number) => void;
  handleDecreaseQuantity: (cartItemId: number, quantity: number) => void;
}

export default function CartItem({
  cartItemId,
  product,
  quantity,
  handleDelete,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}: CartItemProps) {
  const [itemQuantity, setItemQuantity] = useRecoilState(itemQuantityState(cartItemId));
  const { getIsChecked, checkId, uncheckId } = useCheckedItemIds();

  const [isCheckedItems, setIsCheckedItems] = useRecoilState(isCheckedItemIdsState);

  if (isCheckedItems[cartItemId] === undefined) {
    const nextIsCheckedItems = { ...isCheckedItems, [cartItemId]: true };
    setIsCheckedItems(nextIsCheckedItems);
  }
  const handelClickCheckBoxDemo = () => {
    getIsChecked(cartItemId) ? uncheckId(cartItemId) : checkId(cartItemId);
  };

  useEffect(() => {
    setItemQuantity(quantity);
  }, [quantity, setItemQuantity]);

  const handleClickIncreaseQuantity = () => {
    const quantity = itemQuantity + 1;
    setItemQuantity(quantity);
    handleIncreaseQuantity(cartItemId, quantity);
  };

  const handleClickDecreaseQuantity = () => {
    const quantity = Math.max(1, itemQuantity - 1);
    setItemQuantity(quantity);
    handleDecreaseQuantity(cartItemId, quantity);
  };

  const handleClickDeleteButton = () => {
    handleDelete(cartItemId);
  };

  return (
    <CartItemContainer>
      <CardItemHeader>
        <CheckBox isChecked={getIsChecked(cartItemId)} onClick={handelClickCheckBoxDemo} />
        <SmallButton buttonText="삭제" onClick={handleClickDeleteButton} />
      </CardItemHeader>
      <CardItemContent>
        <ProductImageBox src={product.imageUrl} alt={product.name} />
        <ProductInfoBox>
          <div>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{convertToLocaleAmount(product.price)}</ProductPrice>
          </div>
          <QuantityController
            quantity={itemQuantity}
            maxQuantity={100}
            minQuantity={1}
            // handleIncreaseQuantity={handleIncreaseQuantity}
            // handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleClickIncreaseQuantity}
            handleDecreaseQuantity={handleClickDecreaseQuantity}
          />
        </ProductInfoBox>
      </CardItemContent>
    </CartItemContainer>
  );
}

const CartItemContainer = styled.li({
  borderTop: '1px solid #E5E5E5',
  padding: '12px 0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const CardItemHeader = styled.div({
  height: '24px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const CardItemContent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '24px',
});

interface ProductImageBoxProps {
  src: string;
  alt: string;
}

const ProductImageBox = styled.img<ProductImageBoxProps>(({ src, alt }: ProductImageBoxProps) => {
  return {
    width: '112px',
    height: '112px',
    border: '1px solid #E5E5E5',
    borderRadius: '8px',
    src,
    alt,
  };
});

const ProductInfoBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'space-between',
  maxWidth: '246px',

  margin: '9px 0',
  textOverflow: 'ellipsis',
});

const ProductName = styled.p({
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});

const ProductPrice = styled.p({
  color: '#000000',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '14px',
});
