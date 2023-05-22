import { CartItem } from 'src/types';
import Counter from 'src/components/@common/Counter';
import { convertKORWon } from 'src/utils';
import useProductSelect from 'src/hooks/useCartUpdate';
import * as S from './CartItem.styles';
import Svg from 'src/components/@common/Svg';
import { useRecoilValue } from 'recoil';
import CheckBox from 'src/components/@common/CheckBox';
import theme from 'src/styles/theme';
import { quantityTimesNumber } from 'src/recoil/selector';

interface ItemProps {
  item: CartItem;
}

const Item = ({ item }: ItemProps) => {
  const { product } = item;
  const {
    currentCartItem,
    productCountMethod,
    onChangeSelectToggle,
    deleteItem,
  } = useProductSelect(product);

  const { id, isSelected, quantity } = currentCartItem ?? item;

  const itemTotalPrice = useRecoilValue(quantityTimesNumber(id));

  return (
    <S.ItemWrapper>
      <CheckBox
        id={`${id}`}
        checked={isSelected}
        onChange={onChangeSelectToggle}
        backgroundColor={theme.color.secondary}
      >
        <S.ProductImage src={product.imageUrl} alt={product.name} />
      </CheckBox>
      <S.ProductNameConatiner>
        <S.ProductName>{product.name}</S.ProductName>
      </S.ProductNameConatiner>
      <S.ProductOrderControllerContainer>
        <S.SVGContainer>
          <Svg
            type="delete-icon"
            width={20}
            height={20}
            cursor="pointer"
            onClick={deleteItem}
          />
        </S.SVGContainer>
        <Counter
          count={quantity}
          productCountMethod={productCountMethod}
          isOnlyOverOne={true}
        />
        <S.ProductPriceContainer>
          <S.ProductPrice>{convertKORWon(itemTotalPrice)}</S.ProductPrice>
        </S.ProductPriceContainer>
      </S.ProductOrderControllerContainer>
    </S.ItemWrapper>
  );
};

export default Item;
