import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

import { addCartItem } from '@apis/cartItem';

export default function GlobalLayout() {
  const onClick = async () => {
    const productIds = [2, 3, 12, 34];

    for (const productId of productIds) {
      await addCartItem(productId);
    }

    window.location.reload();
  };

  return (
    <div css={container}>
      <div css={wrapper}>
        <Outlet />
      </div>
      <button onClick={onClick} css={addCartItems}>
        <span>장바구니 아이템 추가하기</span>
        <span>🚨 비어있을 때만 사용!! 🚨</span>
      </button>
    </div>
  );
}

const container = css`
  width: 100vw;

  display: flex;
  justify-content: center;
`;

const wrapper = css`
  height: 100vh;

  display: flex;
  flex-direction: column;
  width: 430px;

  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const addCartItems = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;

  left: 15vw;
  top: 2vh;

  width: 200px;
  height: 64px;

  padding: 8px 4px;

  background-color: #6f88f7;

  border: 1px solid black;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 700;
  color: #fff;

  &:hover {
    opacity: 0.7;
  }
`;
