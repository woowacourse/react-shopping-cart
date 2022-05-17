import React from 'react';
import Modal from 'components/Modal';
import AddCartModal from 'containers/AddCartModal';
import AlreadyCartModal from 'containers/AlreadyInCartModal';

export default {
  title: 'containers/Modal',
  component: Modal,
};

const AddCartModalTemplate = () => <AddCartModal />;
const AlreadyCartModalTemplate = () => <AlreadyCartModal />;

export const AddCartModalPrimary = AddCartModalTemplate.bind({});
export const AlreadyCartModalPrimary = AlreadyCartModalTemplate.bind({});
