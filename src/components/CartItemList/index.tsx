import CheckboxButton from "../Button/CheckboxButton/index";
import CountingButton from "../Button/CountingButton/index";
import BasicButton from "../Button/BasicButton/index";

const CartItemList = () => {
  return (
    <>
      <CheckboxButton onClick={() => setIsChecked(!isChecked)} isChecked={isChecked} />
      <CountingButton type="increase" onClickButton={() => setIsCounting1(!isCounting1)} />
      <CountingButton type="decrease" onClickButton={() => setIsCounting2(!isCounting2)} />
      <BasicButton label="삭제" onClick={() => setIsChecked} />
    </>
  );
};

export default CartItemList;
