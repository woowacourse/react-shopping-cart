import { css } from 'styled-components';
import Button from '../components/common/Button';
import Header from '../components/common/Header';

const CartPage = () => {
  return (
    <div>
      <Header title="STORE" />
      <main>
        <Button css={orderButtonStyle}>주문하기</Button>
      </main>
    </div>
  );
};

const orderButtonStyle = css`
  padding: 26px 120px;
  color: #fff;
  background: var(--text-color);
`;

export default CartPage;
