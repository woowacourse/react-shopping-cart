import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';

export default function GeneralLayout() {
  return (
    <div css={container}>
      <div css={wrapper}>
        <Outlet />
      </div>
    </div>
  );
}

const container = css`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const wrapper = css`
  height: 100vh;

  display: flex;
  flex-direction: column;
  width: 430px;

  border-left: 1px solid black;
  border-right: 1px solid black;
`;
