import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TextBox from "@/components/_common/TextBox/TextBox";
import { CAPTION } from "@/constants/titleAndCaption";
import useCartItemsSelectAll from "@/hooks/cart/useCartItemsSelectAll";
import * as S from "./AllSelectCheckBox.style";

const AllSelectCheckBox = () => {
  const { isAllItemSelected, selectAllItem, unselectAllItem } =
    useCartItemsSelectAll();

  return (
    <S.CheckBoxWrapper>
      <CheckBox
        isChecked={isAllItemSelected}
        onClick={isAllItemSelected ? unselectAllItem : selectAllItem}
      />
      <TextBox type="xSmall" text={CAPTION.allItemSelected} />
    </S.CheckBoxWrapper>
  );
};

export default AllSelectCheckBox;
