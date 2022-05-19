import React from 'react';

import Modal from 'components/Modal';
import AddCartModal from 'containers/AddCartModal';
import AlreadyCartModal from 'containers/AlreadyInCartModal';
import AddCartErrorModal from 'containers/AddCartErrorModal';
import DeleteProductCartErrorModal from 'containers/DeleteProductCartErrorModal';

export default {
  title: 'containers/Modal',
  component: Modal,
};

const AddCartModalTemplate = () => <AddCartModal />;
const AlreadyCartModalTemplate = () => <AlreadyCartModal />;
const AddCartErrorModalTemplate = () => <AddCartErrorModal />;
const DeleteProductCartErrorModalTemplate = () => <DeleteProductCartErrorModal />;

export const AddCartModalPrimary = AddCartModalTemplate.bind({});
export const AlreadyCartModalPrimary = AlreadyCartModalTemplate.bind({});
export const AddCartErrorModalPrimary = AddCartErrorModalTemplate.bind({});
export const DeleteProductCartErrorModalPrimary = DeleteProductCartErrorModalTemplate.bind({});
