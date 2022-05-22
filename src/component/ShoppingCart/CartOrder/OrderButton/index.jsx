import Button from 'component/common/Button';
import styled from 'styled-components';

export default function OrderButton({ totalCount }) {
  return (
    <Button>
      <Styled.OrderButtonContent>
        주문하기<span>{totalCount.toLocaleString('ko-KR')}</span>개
      </Styled.OrderButtonContent>
    </Button>
  );
}

const Styled = {
  OrderButtonContent: styled.div`
    width: 100%;
    height: 73px;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 21px;

    color: white;
    background-color: #2ac1bc;

    &:hover {
      background-color: #48d1cc;
    }
  `,
};
