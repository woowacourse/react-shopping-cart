import Spinner from 'component/common/Spinner/Spinner';
import styled from 'styled-components';
import { fruits } from 'constants';

export default {
  title: 'Component/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
};

const FruitBox = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const Template = args => (
  <FruitBox>
    {fruits.map(fruit => (
      <Spinner key={fruit} {...args}>
        <span style={{ fontSize: '50px' }}>{fruit}</span>
      </Spinner>
    ))}
  </FruitBox>
);

const DefaulGridLayout = Template.bind({});

export { DefaulGridLayout };
