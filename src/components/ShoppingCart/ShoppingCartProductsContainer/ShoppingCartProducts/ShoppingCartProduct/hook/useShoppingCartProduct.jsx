import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addId, removeId } from "../../../../../../modules/checkedIds";
import {
  updateCartProductQuantity,
  removeCartProduct,
} from "../../../../../../modules/cartProducts";
import { setSnackBarTypeFail } from "../../../../../../modules/snackBar";

const useShoppingCartProduct = (id, isChecked, productPrice) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleItemClick = (id) => () => {
    navigate(`/product/${id}`);
  };

  const handleProductCheckBoxClick = (id) => {
    if (isChecked) {
      dispatch(removeId(id));
      return;
    }
    dispatch(addId(id));
  };

  const handleIncreaseIconClick = () => {
    dispatch(updateCartProductQuantity(id, "increment"));
  };

  const handleDecreaseIconClick = () => {
    dispatch(updateCartProductQuantity(id, "decrement"));
  };

  const handleUpdateQuantityChange = ({ target }) => {
    dispatch(updateCartProductQuantity(id, "ByUserInput", target.value));
  };

  const handleBackspaceKeyDown = (event) => {
    const { key, target } = event;

    if (key !== "Backspace") return;
    if (target.value.length !== 1) return;

    event.preventDefault();
    target.select();
  };

  const handleRemoveIconClick = () => {
    dispatch(removeCartProduct(id, setSnackBarTypeFail));
  };

  return {
    handleProductCheckBoxClick,
    handleIncreaseIconClick,
    handleDecreaseIconClick,
    handleItemClick,
    handleUpdateQuantityChange,
    handleBackspaceKeyDown,
    handleRemoveIconClick,
    isChecked,
    productPrice,
  };
};

export default useShoppingCartProduct;
