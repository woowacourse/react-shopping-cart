import { styled } from 'styled-components';
import ProductImg from '../ProductCard/ProductImg/ProductImg';
import { ReactComponent as TrashCan } from '../../assets/icon/trash-can.svg';
import Counter from '../common/Counter/Counter';
import CheckBox from '../common/CheckBox/CheckBox';

const CartItem = () => {
  return (
    <Wrapper>
      <CheckBoxWrapper>
        <CheckBox />
      </CheckBoxWrapper>

      <ProductImg
        imageUrl='https://s3-alpha-sig.figma.com/img/c91b/8c58/919fc1af3ddd4c1bba09101cf51013cb?Expires=1684713600&Signature=gJXoDh3Kff5YuZh~dwngjm~n7o37JjnnftCnctPE5Y-QYKTWJAa6~laE1rxwy1s1FhgaJmU1IKg9OAHq0iwUob-hH9TEy3RUYgz-HyXqetKOgEw8Wp4937mBA~2cWyMJjp56bjQgLLbBqM8up2ddQQJLPsyfVdDHr-~jZFL-JEDT72NnlNfyO2qG~W6clycdMfrtkB~YxPPiwHSai1bTEKx6b7vaR79k7OtXO3F3kq9TzQH9vNXM6X9GQtRsw9zjc35JDS2CDoFsAh5u~xThB1udtnHfmTQMdm-lqB0NpwewqYB0GF8qov4mbSCPh20HtPIpLkM5-V1QPEXvyiUbiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        size={{ width: '144px', height: '144px' }}
      />

      <DetailWrapper>
        <ProductName>[든든] 야채바삭 김말이 700g</ProductName>
        <DeleteButton>
          <TrashCan />
        </DeleteButton>
        <CounterWrapper>
          <Counter plusOne={() => {}} minusOne={() => {}} />
        </CounterWrapper>
        <Price>7200원</Price>
      </DetailWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  align-items: center;

  width: 680px;
  height: 160px;
`;

const CheckBoxWrapper = styled.div`
  height: 100%;

  padding: 8px 12px;
`;

const ProductName = styled.span``;

const DetailWrapper = styled.div`
  position: relative;

  flex: 1;
  height: 100%;

  padding: 12px;
`;

const DeleteButton = styled.button`
  position: absolute;

  top: 12px;
  right: 12px;
`;

const CounterWrapper = styled.div`
  position: absolute;

  top: 64px;
  right: 12px;
`;

const Price = styled.span`
  position: absolute;

  bottom: 12px;
  right: 12px;
`;
export default CartItem;
