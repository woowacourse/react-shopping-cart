import { reactRouterOutlet, reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';

import { Layout } from './Layout';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Layout> = {
  title: 'shared/Layout',
  component: Layout,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(
        <div style={{ height: '150vh', backgroundColor: 'lightsalmon' }}>
          <h1>Dummy Page</h1>
          <p>This is a dummy page for testing the Outlet component.</p>
        </div>
      ),
    }),
  },
  render: ({ fixHeader = false, fixFooter = false }) => (
    <Layout
      headerSlot={
        <div style={{ backgroundColor: 'lightblue', height: '50px', textAlign: 'center', alignContent: 'center' }}>
          <h1>headerSlot</h1>
        </div>
      }
      footerSlot={
        <div style={{ backgroundColor: 'lightgreen', height: '50px', textAlign: 'center', alignContent: 'center' }}>
          <h1>footerSlot</h1>
        </div>
      }
      fixHeader={fixHeader}
      fixFooter={fixFooter}
    />
  ),
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const unfixed: Story = {
  name: 'Unfixed (Default)',
};

export const fixedHeaderAndFooter: Story = {
  args: {
    fixHeader: true,
    fixFooter: true,
  },
};
