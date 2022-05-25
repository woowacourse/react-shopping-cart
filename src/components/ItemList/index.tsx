import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import useSnackBar from 'hooks/useSnackBar';
import { useParams } from 'react-router-dom';
import { Item } from 'types/domain';
import useThunkFetch from 'hooks/useThunkFetch';
import { CartListAction } from 'redux/actions/cartList';
import { getCartList } from 'redux/action-creators/cartListThunk';

const contentsNumLimit = 12;

const ItemList = ({ fullItemList }: { fullItemList: Item[] }) => {
  const params = useParams();
  const id = Number(params.id);

  const { data: cartList } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );

  const { updateCartItemQuantity } = useUpdateCartItem(cartList);
  const { openSnackbar } = useSnackBar();

  if (fullItemList.length === 0) return null;

  const itemList = fullItemList.slice((id - 1) * contentsNumLimit, id * contentsNumLimit);

  return (
    <StyledRoot>
      {itemList.map(item => (
        <ItemContainer
          key={item.id}
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          price={item.price}
          title={item.title}
          updateCartItemQuantity={updateCartItemQuantity}
          openSnackbar={openSnackbar}
        />
      ))}
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  height: 1128px;
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  gap: 2.7rem 5.73rem;
`;

export default ItemList;
