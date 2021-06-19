import React from 'react';
import ConfirmModal from '.';

export default {
  component: ConfirmModal,
  title: 'Common/ConfirmModal',
};

const Template = (args) => <ConfirmModal {...args}>정말 해당 상품을 삭제하시겠습니까?</ConfirmModal>;

export const Default = Template.bind({});
