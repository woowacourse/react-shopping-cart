import { Product } from '@customTypes/Product';

import {
  StyledCartItem,
  StyledCartItemFlexBox,
  StyledFlexBox,
  StyledName,
} from '@pages/CartItem/CartItem.styled';
import { Checkbox } from '@commons/Checkbox/Checkbox';
import { SquareImage as CartImage } from '@commons/SquareImage/SquareImage';
import * as Text from '@components/commons/Text/Text';
import ProductStepper from '@components/pages/ProductsPage/ProductList/ProductItem/ProductStepper/ProductStepper';
import { Button as DeleteButton } from '@commons/Button/Button';
import { TrashCan } from '@assets/index';

interface CartItemProps {
  product: Product;
}

const CartItem = (props: CartItemProps) => {
  const { product: thisProduct } = props;
  const { id, name, price, imageUrl } = thisProduct;

  return (
    <StyledCartItem>
      <StyledFlexBox>
        <Checkbox />
        <CartImage src={imageUrl} alt={name} size="l" />
      </StyledFlexBox>
      <StyledName>
        <Text.Paragraph fontWeight="400">{name}</Text.Paragraph>
      </StyledName>
      <StyledCartItemFlexBox>
        <DeleteButton>
          <TrashCan />
        </DeleteButton>
        <ProductStepper
          productId={id}
          inputWidth="72px"
          inputHeight="60px"
          buttonWidth="40px"
          buttonHeight="30px"
        />
        <Text.Description>
          {price.toLocaleString('ko-KR') + ' 원'}
        </Text.Description>
      </StyledCartItemFlexBox>
    </StyledCartItem>
  );
};

export default CartItem;
