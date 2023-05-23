import { CartItem } from 'src/types';
import Counter from 'src/components/@common/Counter';
import { convertKORWon } from 'src/utils';
import useProductSelect from 'src/hooks/useCartUpdate';
import * as S from './CartItem.styles';
import Svg from 'src/components/@common/Svg';
import CheckBox from 'src/components/@common/CheckBox';
import theme from 'src/styles/theme';

interface ItemProps {
  item: CartItem;
  checkItem: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: (id: number) => boolean;
}

const Item = ({ item, checkItem, isChecked }: ItemProps) => {
  const { product } = item;
  const { currentCartItem, patchCartItem, deleteItem } = useProductSelect();

  const itemChecked = isChecked(item.id);

  const {
    id,
    quantity,
    product: { price },
  } = currentCartItem ?? item;

  const itemTotalPrice = quantity * price;
  const itemCount = patchCartItem(item);

  return (
    <S.ItemWrapper>
      <CheckBox
        id={`${id}`}
        checked={itemChecked}
        onChange={checkItem}
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
          productCountMethod={itemCount}
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
