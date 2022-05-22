import styled from 'styled-components';
import { Divider, Text } from 'components/@shared';
import ShoppingBasketListItem from 'components/ShoppingBasketListItem/ShoppingBasketListItem.component';
import { PALETTE } from 'styles/theme';

const ShoppingBasketListItemBox = styled.div`
  width: 100%;
`;

const EmptyListMessage = styled(Text)`
  align-self: center;
`;

function ShoppingBasketListContainer({
  shoppingBasketList,
  selectedProductList,
  clickCheckbox,
  deleteProducts,
  increaseQuantity,
  decreaseQuantity,
}) {
  if (shoppingBasketList.length === 0) {
    return (
      <EmptyListMessage fontSize="extraLarge" bold={true}>
        장바구니에 담긴 상품이 없습니다🥲
      </EmptyListMessage>
    );
  }

  return (
    <>
      {shoppingBasketList.map((productInfo, index) => (
        <ShoppingBasketListItemBox key={productInfo.id}>
          <ShoppingBasketListItem
            isSelected={selectedProductList.includes(productInfo.id)}
            clickCheckbox={clickCheckbox}
            deleteProducts={deleteProducts}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            {...productInfo}
          />
          {shoppingBasketList.length - 1 !== index ? (
            <Divider height="1.5px" margin="24px 0 26px" backgroundColor={PALETTE.GRAY_005} />
          ) : null}
        </ShoppingBasketListItemBox>
      ))}
    </>
  );
}

export default ShoppingBasketListContainer;
