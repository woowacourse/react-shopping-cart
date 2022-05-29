import { ReactComponent as TrashButton } from 'components/CartPage/TrashButton.svg';

export default {
  title: 'TrashButton',
  component: TrashButton,
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#eee' }}>
        <Story />
      </div>
    ),
  ],
};

function Template() {
  return <TrashButton />;
}

export const DefaultIcon = Template.bind({});

DefaultIcon.args = {};
