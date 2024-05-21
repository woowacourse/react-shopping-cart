import { Layout } from './Layout';

import type { Meta, StoryObj } from '@storybook/react';

const commonStyle: Record<string, string> = {
  height: '50px',
  textAlign: 'center',
  alignContent: 'center',
};

const meta: Meta<typeof Layout> = {
  title: 'shared/Layout',
  component: Layout,
  render: () => (
    <Layout
      fixedHeaderSlot={
        <div style={{ backgroundColor: 'blue', ...commonStyle }}>
          <h1>fixedHeaderSlot</h1>
        </div>
      }
      headerSlot={
        <div style={{ backgroundColor: 'lightblue', ...commonStyle }}>
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
        <div style={{ backgroundColor: 'lightgreen', ...commonStyle }}>
          <h1>footerSlot</h1>
        </div>
      }
      fixedFooterSlot={
        <div style={{ backgroundColor: 'green', ...commonStyle }}>
          <h1>fixedFooterSlot</h1>
        </div>
      }
    />
  ),
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Common: Story = {};
