import Button from '.';

export default {
  title: 'Component/Common/Button',
  component: Button,
  argTypes: {
    onClick: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = args => (
  <Button {...args}>
    <div
      style={{
        backgroundColor: 'skyblue',
        width: '150px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      장바구니
    </div>
  </Button>
);

const DefaultButton = Template.bind({});

DefaultButton.args = {
  type: 'button',
};

export { DefaultButton };
