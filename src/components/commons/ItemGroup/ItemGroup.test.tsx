import ItemGroup from './ItemGroup';
import { render } from '@testing-library/react';

describe('Checkbox Component', () => {
  it('Checkbox Snapshot', () => {
    const itemGroupboxUtil = render(<ItemGroup>TEST</ItemGroup>);
    expect(itemGroupboxUtil.asFragment()).toMatchSnapshot();
  });
});
