import { AddButtonStyle } from "./AddButton.style";
import { AddItem } from "@/api";

const AddButton = () => {
  return (
    <div
      css={AddButtonStyle}
      onClick={() => {
        AddItem({ productId: 2 });
      }}
    >
      ADD
    </div>
  );
};

export default AddButton;
