import React from 'react';
import Modal from 'components/Modal';
import AddCartModal from 'containers/AddCartModal';

export default {
  title: 'containers/Modal',
  component: Modal,
};

const AddCartModalTemplate = () => <AddCartModal />;

export const AddCartModalPrimary = AddCartModalTemplate.bind({});
