import React from 'react';
import Dialog, { DIALOG_TYPE } from './Dialog';

export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILURE = 'ADD_FAILURE';

const CartInsertingItemDialog = ({ type, onConfirm, onCancel }) => (
  <Dialog type={DIALOG_TYPE.ALERT} onConfirm={() => onConfirm()} onCancel={() => onCancel()} onClose={() => onCancel()}>
    {type === ADD_SUCCESS ? '장바구니에 추가되었습니다.' : '이미 장바구니에 추가되어 있습니다.'}
  </Dialog>
);
export default CartInsertingItemDialog;
