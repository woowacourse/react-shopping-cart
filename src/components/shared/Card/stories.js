import Card from '.';

export default {
  component: Card,
  title: 'components/shared/Card',
};

const Template = (args) => (
  <Card {...args}>
    <p>PET보틀-정사각(420ml)</p>
  </Card>
);

export const Vertical = Template.bind({});

Vertical.args = {
  imgSrc: 'https://picsum.photos/200/200',
  type: 'vertical',
  width: '282px',
  height: '358px',
};

export const Horizontal = Template.bind({});

Horizontal.args = {
  imgSrc: 'https://picsum.photos/200/200',
  type: 'horizontal',
  height: '282px',
  width: '358px',
};
