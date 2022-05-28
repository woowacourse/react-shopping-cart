import PropTypes from 'prop-types';

import Button from 'components/@common/Button/styles';
import CheckBox from 'components/@common/CheckBox';
import CartProducItem from 'components/CartProductItem';

import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';

const CartList = ({
  cartList,
  isAllChecked,
  checkboxItemCount,
  checkAllSelectButton,
  deleteSelectedItem,
  isChecked,
  handleChecked,
  handleItemCount,
}) => (
  <>
    <CommonStyled.FlexWrapper justifyContent="space-between" margin="1rem 0 2rem 0">
      <CheckBox checkState={isAllChecked} handleChecked={checkAllSelectButton()}>
        {isAllChecked ? '선택해제' : '전체선택'}
      </CheckBox>
      {checkboxItemCount === 0 ? (
        <Button
          width="7rem"
          height="40px"
          margin="0"
          size="1rem"
          weight="normal"
          cursor="not-allowed"
          backgroundColor={COLORS.GRAY_100}
          color={COLORS.GRAY_300}
          hoverColor={COLORS.GRAY_100}
          onClick={() => {}}
        >
          상품삭제
        </Button>
      ) : (
        <Button
          width="7rem"
          height="40px"
          margin="0"
          size="1rem"
          weight="normal"
          onClick={deleteSelectedItem()}
        >
          상품삭제
        </Button>
      )}
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
            isChecked={isChecked}
            handleChecked={handleChecked()}
            handleItemCount={handleItemCount}
          />
          <CommonStyled.HR size="1px" />
        </>
      ))}
  </>
);

CartList.propTypes = {
  cartList: PropTypes.array,
  isAllChecked: PropTypes.bool,
  checkAllSelectButton: PropTypes.func,
  deleteSelectedItem: PropTypes.func,
  isChecked: PropTypes.func,
  handleChecked: PropTypes.func,
  handleItemCount: PropTypes.func,
};

CartList.defaultProps = {
  cartList: {},
  isAllChecked: false,
  checkAllSelectButton: () => {},
  deleteSelectedItem: () => {},
  isChecked: () => {},
  handleChecked: () => {},
  handleItemCount: () => {},
};

export default CartList;
