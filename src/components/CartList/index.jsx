import PropTypes from 'prop-types';

import Button from 'components/@common/Button/styles';
import CheckBox from 'components/@common/CheckBox';
import CartProducItem from 'components/CartProductItem';

import * as CommonStyled from 'components/@common/CommonStyle/styles';

const CartList = ({
  cartList,
  selectAllChecked,
  checkAllSelectButton,
  handleDeleteSelectedItem,
  isChecked,
  handleChecked,
  handleItemCount,
}) => (
  <>
    <CommonStyled.FlexWrapper justifyContent="space-between" margin="1rem 0 2rem 0">
      <CheckBox checkState={selectAllChecked} handleChecked={() => checkAllSelectButton()}>
        {selectAllChecked ? '선택해제' : '전체선택'}
      </CheckBox>
      <Button
        width="7rem"
        height="40px"
        margin="0"
        size="1rem"
        weight="normal"
        onClick={() => handleDeleteSelectedItem()}
      >
        상품삭제
      </Button>
    </CommonStyled.FlexWrapper>
    <p>싱싱배송 상품 ({cartList.length}종)</p>
    <CommonStyled.HR />
    {cartList &&
      cartList.map(({ id, name, thumbnail, price, count }) => (
        <>
          <CartProducItem
            key={id}
            id={id}
            name={name}
            thumbnail={thumbnail}
            price={price}
            count={count}
            isChecked={isChecked(id)}
            handleChecked={() => handleChecked(id)}
            handleItemCount={handleItemCount}
          />
          <CommonStyled.HR size="1px" />
        </>
      ))}
  </>
);

CartList.propTypes = {
  cartList: PropTypes.object,
  selectAllChecked: PropTypes.bool,
  checkAllSelectButton: PropTypes.func,
  handleDeleteSelectedItem: PropTypes.func,
  isChecked: PropTypes.func,
  handleChecked: PropTypes.func,
  handleItemCount: PropTypes.func,
};

CartList.defaultProps = {
  cartList: {},
  selectAllChecked: false,
  checkAllSelectButton: () => {},
  handleDeleteSelectedItem: () => {},
  isChecked: () => {},
  handleChecked: () => {},
  handleItemCount: () => {},
};

export default CartList;
