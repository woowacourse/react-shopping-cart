import { CartItem } from 'src/types';
import { SelectInput, SelectLabel } from '../CartList/CartList.styles';
import Counter from 'src/components/Counter';
import { convertKORWon } from 'src/utils';
import useProductSelect from 'src/hooks/useCartUpdate';
import * as S from './CartItem.styles';
import Svg from 'src/components/@common/Svg';
import { useRecoilValue } from 'recoil';
import { quantityTimesNumber } from 'src/recoil/cartList';
import CheckBox from 'src/components/@common/CheckBox';
import theme from 'src/styles/theme';

interface ItemProps {
  item: CartItem;
}

const Item = ({ item }: ItemProps) => {
  const { id, product, quantity, isSelected } = item;

  const { productCountMethod, onChangeSelectToggle, deleteItem } =
    useProductSelect(product);
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
      <Counter
        count={quantity}
        productCountMethod={productCountMethod}
        isOnlyOverOne={true}
      />
      <S.ProductPriceContainer>
        <S.ProductPrice>{convertKORWon(itemTotalPrice)}</S.ProductPrice>
      </S.ProductPriceContainer>
      <Svg
        type="delete-icon"
        width={20}
        height={20}
        cursor="pointer"
        onClick={deleteItem}
      />
    </S.ItemWrapper>
  );
};

export default Item;
