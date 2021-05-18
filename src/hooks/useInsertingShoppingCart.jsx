import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { insertShoppingCartItem } from '../redux/actions/shoppingCartActions';

const ADD_SUCCESS = 'ADD_SUCCESS';
const ADD_FAILURE = 'ADD_FAILURE';

const useInsertingShoppingCart = ({ product_id, setIsDialogOpen, setType }) => {
  const shoppingCartItemList = useSelector((state) => state.shoppingCart.shoppingCartItemList.data);
  const dispatch = useDispatch();

  const isExistedInShoppingCart = () =>
    shoppingCartItemList.some((shoppingCartItem) => shoppingCartItem.product_id === product_id);

  const insertShoppingCart = () => {
    if (isExistedInShoppingCart()) {
      setType(ADD_FAILURE);
      setIsDialogOpen(true);

      return;
    }

    setType(ADD_SUCCESS);
    setIsDialogOpen(true);
    dispatch(insertShoppingCartItem({ product_id }));
  };

  return { insertShoppingCart, ADD_SUCCESS, ADD_FAILURE };
};

useInsertingShoppingCart.propTypes = {
  product_id: PropTypes.number.isRequired,
  setIsDialogOpen: PropTypes.func.isRequired,
  setType: PropTypes.func.isRequired,
};

export default useInsertingShoppingCart;
