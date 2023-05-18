import styled from 'styled-components';

interface DeleteIconProps {
  cartItemId: number;
  handleClick: (cartItemId: number) => void;
}
export default function DeleteIcon({ cartItemId, handleClick }: DeleteIconProps) {
  return (
    <>
      <Img src="./delete.svg" onClick={() => handleClick(cartItemId)} />
    </>
  );
}

const Img = styled.img`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;
