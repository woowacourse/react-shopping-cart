import { 숫자 } from 'constants/';
import PropTypes from 'prop-types';
import Button from '../Button/styles';
import * as CommonStyle from '../CommonStyle/styles';

const isValidOrder = (value) => value > 숫자.최대_주문수량 || value < 숫자.최소_주문수량;

const Counter = ({ id, count, handleItemCount }) => {
  const onClickButton = (amount) => {
    const totalAmount = count + amount;
    if (isValidOrder(totalAmount)) {
      return;
    }

    handleItemCount(id, totalAmount);
  };

  const onInputCounter = (e) => {
    const inputNumber = Number(e.target.value);

    if (isValidOrder(inputNumber)) {
      return;
    }

    handleItemCount(id, inputNumber);
  };

  return (
    <CommonStyle.FlexWrapper>
      <CommonStyle.Input
        width="80px"
        height="40px"
        type="number"
        size="1.2rem"
        textAlign="center"
        value={count}
        onChange={(e) => onInputCounter(e)}
      />
      <CommonStyle.FlexWrapper flexDirection="column" width="30%" margin="0">
        <Button
          onClick={() => onClickButton(1)}
          width="40px"
          height="20px"
          margin="0"
          size="0.5rem"
        >
          ▲
        </Button>
        <Button
          onClick={() => onClickButton(-1)}
          width="40px"
          height="20px"
          margin="0"
          size="0.5rem"
        >
          ▼
        </Button>
      </CommonStyle.FlexWrapper>
    </CommonStyle.FlexWrapper>
  );
};

Counter.propTypes = {
  id: PropTypes.number.isRequired,
  count: PropTypes.number,
  handleItemCount: PropTypes.func,
};

Counter.defaultProps = {
  count: 1,
  handleItemCount: () => {},
};

export default Counter;
