import React, { VFC, MouseEventHandler, useState, useEffect } from "react";
import Modal from "../Modal";

import { Inner, Title, ButtonControls } from "./style";

interface ConfirmProps {
  title: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onReject: MouseEventHandler<HTMLDivElement | HTMLButtonElement>;
}

const Confirm: VFC<ConfirmProps> = ({ title, onConfirm, onReject }) => (
  <Modal closeModal={onReject}>
    <Inner>
      <Title>
        <p>{title}</p>
      </Title>
      <ButtonControls>
        <button onClick={onReject}>
          <p>취소</p>
        </button>
        <button onClick={onConfirm}>
          <p>확인</p>
        </button>
      </ButtonControls>
    </Inner>
  </Modal>
);

export default Confirm;
export { ConfirmProps };
