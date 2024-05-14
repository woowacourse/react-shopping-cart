import * as S from './styled';
import Checkbox from '../Checkbox/Checkbox';
import DeleteButton from '../DeleteButton/DeleteButton';
import SetQuantity from '../SetQuantity/SetQuantity';

const ShoppingCartItem = () => {
  return (
    <S.Container>
      <S.Hr />
      <S.Header>
        <Checkbox id={1} isChecked={true} />
        <DeleteButton />
      </S.Header>
      <S.Contents>
        <S.ProductImage
          src={
            'https://t1.kakaocdn.net/together_action_prod/admin/20230730/b8d3ba0648d64f5c8564b2e7e908a171'
          }
          alt="product"
        />
        <S.ProductDescription>
          <S.ProductName>춘식이</S.ProductName>
          <S.ProductPrice>15,000,000원</S.ProductPrice>
          <SetQuantity
            quantity={0}
            onClick={{ plus: () => console.log('춘식이'), minus: () => console.log('준식이') }}
          />
        </S.ProductDescription>
      </S.Contents>
    </S.Container>
  );
};

export default ShoppingCartItem;
