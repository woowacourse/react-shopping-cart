import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR } from '../../constants/styles';
import CheckBox from '../CheckBox/CheckBox';
import { BasicImage, Flex } from '../shared/basics';
import { ReactComponent as Bin } from '../shared/Bin.svg';
import NumberInput from '../shared/NumberInput';

function CartItem({ title, price, src }) {
  return (
    <Style.Container justify="space-between">
      <Flex justify="space-between" gap="20px">
        <CheckBox />
        <BasicImage size="small" src={src} alt={title} />
        <span>{title}</span>
      </Flex>
      <Flex direction="column" justify="space-between" align="flex-end">
        <Bin />
        <NumberInput />
        <span>{`${Number(price).toLocaleString('ko-KR')}원`}</span>
      </Flex>
    </Style.Container>
  );
}

CartItem.propTypes = {
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default CartItem;

const Style = {
  Container: styled(Flex)`
    padding: 23px 0;
    border-bottom: 2px solid lightgray;
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
