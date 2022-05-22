import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { checkOne, loadCarts, patchCarts, uncheckOne } from 'store/carts';

import { API } from 'constants/api';
import { COLOR } from 'constants/styles';

import useFetch from 'hooks/useFetch';
import useUser from 'hooks/useUser';

import CheckBox from 'components/CheckBox/CheckBox';
import { BasicButton, BasicImage, Flex } from 'components/shared/basics';
import { ReactComponent as Bin } from 'components/shared/Bin.svg';
import NumberInput from 'components/shared/NumberInput';
import { Link } from 'react-router-dom';
import PATH from 'constants/path';

function CartItem({ id, title, price, src, isChecked, quantity }) {
  const dispatch = useDispatch();
  const { userId } = useUser();

  const { apiCall: deleteClickedProduct } = useFetch({
    url: `${API.CARTS}/${userId}/${id}`,
    method: 'DELETE',
  });

  const { apiCall: patchQuantity } = useFetch({
    url: `${API.CARTS}/${userId}/${id}/`,
    method: 'PATCH',
  });

  const handleUncheckProduct = () => {
    dispatch(uncheckOne(id));
  };

  const handleCheckProduct = () => {
    dispatch(checkOne(id));
  };

  const handleDeleteCartProduct = () => {
    if (!window.confirm('해당 상품을 삭제하시겠습니까?')) {
      return;
    }

    deleteClickedProduct();
    dispatch(loadCarts(userId));
  };

  const handleChangeQuantity = (count) => {
    patchQuantity(count);
    dispatch(patchCarts(id, count));
  };

  return (
    <Style.FlexContainer justify="space-between">
      <Flex justify="space-between" gap="20px">
        <CheckBox
          checked={isChecked}
          onCheck={handleCheckProduct}
          onUncheck={handleUncheckProduct}
        />
        <Style.Link to={`/${PATH.PRODUCT}/${id}`}>
          <BasicImage size="small" src={src} alt={title} />
          <span>{title}</span>
        </Style.Link>
      </Flex>
      <Flex direction="column" justify="space-between" align="flex-end">
        <BasicButton onClick={handleDeleteCartProduct}>
          <Bin />
        </BasicButton>
        <NumberInput count={quantity} onChange={handleChangeQuantity} />
        <span>{`${Number(price).toLocaleString('ko-KR')}원`}</span>
      </Flex>
    </Style.FlexContainer>
  );
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
};

CartItem.defaultProps = {
  isChecked: true,
};

export default CartItem;

const Style = {
  FlexContainer: styled(Flex)`
    padding: 23px 0;
    border-bottom: 2px solid lightgray;
  `,
  Link: styled(Link)`
    display: flex;
    align-items: flex-start;
    gap: 15px;
  `,
  CheckBox: styled.input`
    appearance: none;
    border: 1px solid #2ac1bc;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:focus {
      outline: none;
    }
    &:checked {
      background-color: ${COLOR.PRIMARY};
    }
    &::after {
      content: '✔';
      width: 30px;
      height: 100%;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `,
};
