import ListItem from './ListItem';
import { render } from '@testing-library/react';

describe('ListItem Component', () => {
  it('ListItem Snapshot', () => {
    const listItemUtil = render(<ListItem name="이름" price="2000" quantity="2" size="MD" />);
    expect(listItemUtil.asFragment()).toMatchSnapshot();
  });
});
