import CheckBox from "@/components/_common/CheckBox/CheckBox";
import TextBox from "@/components/_common/TextBox/TextBox";
import { CAPTION } from "@/constants/titleAndCaption";
import * as S from "./AllSelectCheckBox.style";
import useSelectedItems from "@/hooks/cart/useSelectedItems";

const AllSelectCheckBox = () => {
  const { isAllItemSelected, selectAllItem, unselectAllItem } =
    useSelectedItems();

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
