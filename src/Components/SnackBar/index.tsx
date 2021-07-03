import React from "react";
import { ALERT_MESSAGE_MAX_NUM } from "../../constants/message";
import { Bar } from './style';

const snackBarOrders = Array.from({ length: ALERT_MESSAGE_MAX_NUM }, (_, index) => index + 1);
type SnackBarOrder = typeof snackBarOrders[number];

const SNACKBAR_HEIGHT_REM = 2.3;
const SNACKBAR_GAP_REM = 0.5;
const ANIMATION_DURATION_MS = 1000;
const getSnackBarBottom = (order: SnackBarOrder) =>
`${order * (SNACKBAR_HEIGHT_REM + SNACKBAR_GAP_REM) - SNACKBAR_HEIGHT_REM}rem`;


interface SnackBarProps {
  messages: string[];
}

const SnackBar = ({ messages }: SnackBarProps) => {

  return (
    <>
      {messages.map((message, index, arr) => {
        const order = arr.length - index;

        return (
          <Bar
            key={index}
            bottom={getSnackBarBottom(order)}
            animationDuration={`${ANIMATION_DURATION_MS}ms`}
          >
            {message}
          </Bar>
        );
      })}
    </>
  );
};

export default SnackBar;
export { SnackBarProps, SnackBarOrder };
