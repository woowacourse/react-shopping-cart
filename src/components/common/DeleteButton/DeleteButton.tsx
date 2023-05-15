import styled from "styled-components";
import { BiTrash } from "react-icons/bi";

interface DeleteButtonProps {
  productId: number;
  notifyParentWhenDeleteTriggered: (productId: number) => void;
}

const DeleteButton = ({
  productId,
  notifyParentWhenDeleteTriggered,
}: DeleteButtonProps) => {
  return (
    <Button onClick={() => notifyParentWhenDeleteTriggered(productId)}>
      <DeleteIcon />
    </Button>
  );
};

const colors = {
  slightBrightRed: "#f44343",
};

const Button = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    text-shadow: 0px 0px 21px ${colors.slightBrightRed};
  }
`;

const DeleteIcon = styled(BiTrash)`
  color: ${colors.slightBrightRed};
  font-size: 22px;
  transition: 0.3s;

  ${Button}:hover > & {
    filter: drop-shadow(0 0 5px ${colors.slightBrightRed});
  }
`;
export default DeleteButton;
