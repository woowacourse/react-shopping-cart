import HeaderContainer from './HeaderContainer.component';

export default {
  title: 'Shared/HeaderContainer',
  component: HeaderContainer,
};

export const DefaultHeaderContainer = args => <HeaderContainer {...args} />;
DefaultHeaderContainer.args = {};
