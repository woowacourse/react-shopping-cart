import React from 'react';

import Modal from 'components/Modal';
import AddCartModal from 'containers/AddCartModal';
import AlreadyCartModal from 'containers/AlreadyInCartModal';
import AddCartErrorModal from 'containers/AddCartErrorModal';
import DeleteProductCartErrorModal from 'containers/DeleteProductCartErrorModal';
import CartProductMaxCountModal from 'containers/CartProductMaxCountModal';

export default {
  title: 'containers/Modal',
  component: Modal,
};

const AddCartModalTemplate = () => <AddCartModal />;
const AlreadyCartModalTemplate = () => <AlreadyCartModal />;
const AddCartErrorModalTemplate = () => <AddCartErrorModal />;
const DeleteProductCartErrorModalTemplate = () => <DeleteProductCartErrorModal />;
const CartProductMaxCountModalTempate = () => <CartProductMaxCountModal />;

export const AddCartModalPrimary = AddCartModalTemplate.bind({});
export const AlreadyCartModalPrimary = AlreadyCartModalTemplate.bind({});
export const AddCartErrorModalPrimary = AddCartErrorModalTemplate.bind({});
export const DeleteProductCartErrorModalPrimary = DeleteProductCartErrorModalTemplate.bind({});
export const CartProductMaxCountModalPrimary = CartProductMaxCountModalTempate.bind({});
