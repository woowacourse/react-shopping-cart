import { CartItem } from "../../types";
import { SelectedCartItemCard } from "../selectedCartItemCard/SelectedCartItemCard";
import { StyledSelectedCartItemCardList } from "./selectedCartItemCardList.styled";

export const SelectedCartItemCardList: React.FC<{ selectedCartItems: CartItem[] }> = ({
  selectedCartItems,
}) => {
  return (
    <StyledSelectedCartItemCardList>
      {selectedCartItems.map((item) => (
        <SelectedCartItemCard key={item.id} {...item} />
      ))}
    </StyledSelectedCartItemCardList>
  );
};
