import { Layout } from './Layout';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Layout> = {
  title: 'shared/Layout',
  component: Layout,
  render: ({ fixHeader = false, fixFooter = false }) => (
    <Layout
      headerSlot={
        <div style={{ backgroundColor: 'lightblue', height: '50px', textAlign: 'center', alignContent: 'center' }}>
          <h1>headerSlot</h1>
        </div>
      }
      contentSlot={
        <div
          style={{
            height: '120vh',
            width: '90vw',
            backgroundColor: 'lightsalmon',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>contentSlot</h1>
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

export const Unfixed: Story = {
  name: 'Unfixed (Default)',
};

export const FixedHeaderAndFooter: Story = {
  args: {
    fixHeader: true,
    fixFooter: true,
  },
};
