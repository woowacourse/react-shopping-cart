import HeaderLink from './HeaderLink.component';

export default {
  title: 'Shared/HeaderLink',
  component: HeaderLink,
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#2AC1BC' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: { control: 'select', options: ['title', 'nav'] },
  },
};

export const TitleHeaderLink = args => (
  <HeaderLink to="/" {...args}>
    제목 링크
  </HeaderLink>
);
TitleHeaderLink.args = {
  type: 'title',
};

export const NavHeaderLink = args => (
  <HeaderLink to="/" {...args}>
    네비게이션 링크
  </HeaderLink>
);
NavHeaderLink.args = {
  type: 'nav',
};
