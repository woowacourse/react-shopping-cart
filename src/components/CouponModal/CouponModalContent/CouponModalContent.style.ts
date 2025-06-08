import { css } from '@emotion/react';

const title = css`
  font-weight: 700;
  font-size: 18px;
`;

const imgLayout = css`
  width: 16px;
  height: 16px;
`;

const deliveryInfo = css`
  font-weight: 500;
  font-size: 12px;
`;

const deliveryInfoBox = css`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 32px;
`;

const couponList = css`
  margin-top: 16px;
`;

const headLayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const closeButton = css`
  border: none;
  background-color: transparent;
  padding: 0px;
  cursor: pointer;
`;

const closeImgLayout = css`
  width: 14px;
  height: 14px;
`;

export {
  title,
  imgLayout,
  deliveryInfo,
  deliveryInfoBox,
  couponList,
  headLayout,
  closeButton,
  closeImgLayout,
};
