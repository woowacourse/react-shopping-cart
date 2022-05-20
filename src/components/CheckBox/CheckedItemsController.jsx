import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PATH from '../../constants/path';
import useFetch from '../../hooks/useFetch';
import { checkAll, loadCarts, uncheckAll } from '../../store/carts';
import { BasicButton, Flex } from '../shared/basics';
import CheckBox from './CheckBox';

function CheckedItemsController({ checkedProducts }) {
  const query = checkedProducts.map((product) => product.id).join('&');
  const { apiCall: deleteCheckedProducts } = useFetch({
    url: `${PATH.CARTS}/${query}`,
    method: 'DELETE',
  });

  const dispatch = useDispatch();

  const handleCheckAllProducts = () => {
    dispatch(checkAll());
  };

  const handleUncheckAllProducts = () => {
    dispatch(uncheckAll());
  };

  const handleCheckedProductsDelete = () => {
    if (!checkedProducts.length) {
      return;
    }

    if (!window.confirm('선택된 상품을 삭제하시겠습니까?')) {
      return;
    }

    deleteCheckedProducts();
    dispatch(loadCarts());
  };

  return (
    <Style.CheckBoxContainer justify="space-between" align="center">
      <Flex align="center">
        <CheckBox
          onCheck={handleCheckAllProducts}
          onUncheck={handleUncheckAllProducts}
        />
        <Style.CheckBoxLabel>전체선택</Style.CheckBoxLabel>
      </Flex>
      <Style.DeleteButton onClick={handleCheckedProductsDelete} type="button">
        상품삭제
      </Style.DeleteButton>
    </Style.CheckBoxContainer>
  );
}

export default CheckedItemsController;

const Style = {
  CheckBoxContainer: styled(Flex)`
    margin: 20px 0;
  `,
  DeleteButton: styled(BasicButton)`
    padding: 12px 22px;
    border: 1px solid #bbbbbb;
  `,
  CheckBoxLabel: styled.span`
    padding-left: 7px;
  `,
  CartTitle: styled.h3`
    display: flex;
    align-items: center;
    font-size: 20px;
  `,
};
