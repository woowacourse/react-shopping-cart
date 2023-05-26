import styled from 'styled-components';
import DeleteButtonImage from '../../asset/delete_icon.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartRequestAction } from '../../atoms/cartState';
import { cartSelectsState } from '../../atoms/cartSelects';

interface DeleteButtonProps {
  cartId: number;
}

export default function DeleteButton({ cartId }: DeleteButtonProps) {
  const setCartRequestActions = useSetRecoilState(
    cartRequestAction({ action: 'GET' })
  );
  const [cartSelects, setCartSelects] = useRecoilState(cartSelectsState);

  const onDeleteCartItem = () => {
    setCartRequestActions({
      action: 'DELETE',
      payload: { cartId: cartId },
    });
    const newCartSelects = new Set(Array.from(cartSelects));
    newCartSelects.delete(cartId);
    setCartSelects(newCartSelects);
  };

  return (
    <DeleteButtonContainer onClick={onDeleteCartItem}>
      <DeleteButtonIcon src={DeleteButtonImage} />
    </DeleteButtonContainer>
  );
}

const DeleteButtonContainer = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  background-color: transparent;
  cursor: pointer;
`;

const DeleteButtonIcon = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;
