import Modal from './Modal';

export default {
  title: 'ShoppingCart/Modal',
  component: Modal,
  argTypes: { children: { control: 'text' } },
};

const Template = ({ ...args }) => <Modal {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: (
    <>
      <span>상품이 장바구니에 담겼습니다.</span>
      <button type="button">{'장바구니 바로가기 >'}</button>
    </>
  ),
  onClose: () => alert('모달 닫기'),
};
