import { CartItem } from 'src/types';
import { SelectInput, SelectLabel } from '../CartList/CartList.styles';
import Counter from 'src/components/Counter';
import { convertKORWon } from 'src/utils';
import useProductSelect from 'src/hooks/useProductSelect';
import * as S from './CartItem.styles';
import Svg from 'src/components/@common/Svg';

interface ItemProps {
  item: CartItem;
}

const Item = ({ item }: ItemProps) => {
  const { id, product, quantity, isSelected } = item;

  const { increase, decrease } = useProductSelect(product);

  return (
    <S.ItemWrapper>
      <SelectLabel htmlFor={`${id}`}>
        <SelectInput type="checkbox" id={`${id}`} checked={isSelected} />
      </SelectLabel>
      <S.ProductImage src={product.imageUrl} alt={product.name} />
      <S.ProductNameConatiner>
        <S.ProductName>{product.name}</S.ProductName>
      </S.ProductNameConatiner>
      <Counter
        count={quantity}
        increase={increase}
        decrease={decrease}
        isOnlyOverOne={true}
      />
      <S.ProductPriceContainer>
        <S.ProductPrice>{convertKORWon(product.price)}</S.ProductPrice>
      </S.ProductPriceContainer>
      <Svg type="delete-icon" width={20} height={20} cursor="pointer" />
    </S.ItemWrapper>
  );
};

export default Item;
