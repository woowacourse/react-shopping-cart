import Button from './Button.component';

export default {
  title: 'Shared/Button',
  component: Button,
};

export const Default = args => (
  <Button style={{ fontSize: '32px', color: '#fff' }} {...args}>
    버튼
  </Button>
);

Default.args = {
  width: '638px',
  height: '98px',
  backgroundColor: '#73675C',
};
