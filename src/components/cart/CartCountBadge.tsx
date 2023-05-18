import { styled } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { cartListLengthState } from '../../recoil/selectors';

export default function CartCountBadge() {
  const cartListLength = useRecoilValue(cartListLengthState);

  return <Style.CountBadge>{cartListLength}</Style.CountBadge>;
}

const Style = {
  CountBadge: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;

    border-radius: 50%;

    background-color: #04c09e;
  `,
};
