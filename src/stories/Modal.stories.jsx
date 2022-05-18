import React from 'react';

import Modal from 'components/Modal';
import AddCartModal from 'containers/AddCartModal';
import AlreadyCartModal from 'containers/AlreadyInCartModal';
import AddCartErrorModal from 'containers/AddCartErrorModal';

export default {
  title: 'containers/Modal',
  component: Modal,
};

const AddCartModalTemplate = () => <AddCartModal />;
const AlreadyCartModalTemplate = () => <AlreadyCartModal />;
const AddCartErrorModalTemplate = () => <AddCartErrorModal />;

export const AddCartModalPrimary = AddCartModalTemplate.bind({});
export const AlreadyCartModalPrimary = AlreadyCartModalTemplate.bind({});
export const AddCartErrorModalPrimary = AddCartErrorModalTemplate.bind({});
