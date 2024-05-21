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
      headerSlot={
        <div style={{ backgroundColor: 'blue', ...commonStyle }}>
          <h1>Header</h1>
        </div>
      }
      contentHeaderSlot={
        <div style={{ backgroundColor: 'lightblue', ...commonStyle }}>
          <h1>ContentHeader</h1>
        </div>
      }
      contentBodySlot={
        <div
          style={{
            height: '110vh',
            width: '90vw',
            backgroundColor: 'lightsalmon',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>ContentBody</h1>
        </div>
      }
      contentFooterSlot={
        <div style={{ backgroundColor: 'lightgreen', ...commonStyle }}>
          <h1>ContentFooter</h1>
        </div>
      }
      footerSlot={
        <div style={{ backgroundColor: 'green', ...commonStyle }}>
          <h1>Footer</h1>
        </div>
      }
    />
  ),
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Common: Story = {};
