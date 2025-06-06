import { css } from '@emotion/react';

const confirmLayout = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const totalPriceBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const titleText = css`
  font-weight: 700;
  font-size: 24px;
`;

const subtitleText = css`
  font-weight: 700;
  font-size: 16px;
`;

const bodyText = css`
  font-weight: 500;
  font-size: 12px;
`;

const backButton = css`
  border: none;
  padding: 0px;
  background-color: transparent;
  cursor: pointer;
`;

const backImg = css`
  width: 21px;
  height: 21px;
`;

const titleStyle = css`
  font-weight: 700;
  font-size: 24px;
`;

const subTitleStyle = css`
  font-weight: 500;
  font-size: 12px;
`;

const titleBox = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const subTitleBox = css`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const applyButton = css`
  width: 100%;
  height: 48px;
  background-color: white;
  border: 1px solid #33333340;
  border-radius: 5px;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  color: #333333bf;
  cursor: pointer;
`;

const checkBoxWrapper = css`
  display: flex;
  align-items: center;
  gap: 4.5px;
  margin-top: 16px;
`;

const deliveryText = css`
  font-weight: 700;
  font-size: 16px;
`;

const labelText = css`
  font-weight: 500;
  font-size: 12px;
`;

export {
  confirmLayout,
  titleText,
  subtitleText,
  totalPriceBox,
  bodyText,
  backButton,
  backImg,
  titleStyle,
  subTitleStyle,
  titleBox,
  subTitleBox,
  applyButton,
  checkBoxWrapper,
  labelText,
  deliveryText,
};
