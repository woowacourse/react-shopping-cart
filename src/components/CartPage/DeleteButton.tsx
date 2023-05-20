import styled from 'styled-components';
import DeleteButtonImage from '../../asset/delete_icon.png';
import { useSetRecoilState } from 'recoil';
import { cartRequestAction } from '../../atoms/cartState';

interface DeleteButtonProps {
  cartId: number;
}

export default function DeleteButton({ cartId }: DeleteButtonProps) {
  const setCartRequestActions = useSetRecoilState(
    cartRequestAction({ action: 'GET' })
  );

  return (
    <DeleteButtonContainer
      onClick={() => {
        setCartRequestActions({
          action: 'DELETE',
          payload: { cartId: cartId },
        });
      }}
    >
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
