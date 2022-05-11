import Header from './Header.component';

export default {
  title: 'Header',
  component: Header,
};

export const DefaultHeader = args => <Header {...args} />;
DefaultHeader.args = {};
