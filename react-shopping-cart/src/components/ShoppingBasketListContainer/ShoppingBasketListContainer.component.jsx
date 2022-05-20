import styled from 'styled-components';
import { Divider } from 'components/@shared';
import ShoppingBasketListItem from 'components/ShoppingBasketListItem/ShoppingBasketListItem.component';
import { PALETTE } from 'styles/theme';

const ShoppingBasketListItemBox = styled.div`
  width: 100%;
`;

function ShoppingBasketListContainer({ shoppingBasketList }) {
  return (
    <>
      {shoppingBasketList.map((productInfo, index) => (
        <ShoppingBasketListItemBox key={productInfo.id}>
          <ShoppingBasketListItem count={1} {...productInfo} />
          {shoppingBasketList.length - 1 !== index ? (
            <Divider height="1.5px" margin="24px 0 26px" backgroundColor={PALETTE.GRAY_005} />
          ) : null}
        </ShoppingBasketListItemBox>
      ))}
    </>
  );
}

export default ShoppingBasketListContainer;
