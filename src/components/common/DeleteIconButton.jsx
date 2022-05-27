import { RiDeleteBinLine } from 'react-icons/ri';
import styled from 'styled-components';

function DeleteIconButton({ size = 25, onClickCallback }) {
  return (
    <DeleteButtonLayout onClick={onClickCallback}>
      <RiDeleteBinLine size={size} />
    </DeleteButtonLayout>
  );
}

const DeleteButtonLayout = styled.div`
  color: ${({ theme }) => theme.COLORS.LIGHT_BLACK};
  &:hover {
    color: ${({ theme }) => theme.COLORS.LIGHT_PRIMARY};
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default DeleteIconButton;
