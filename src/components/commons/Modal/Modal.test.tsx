import Modal from './Modal';
import { render } from '@testing-library/react';

describe('Modal Component', () => {
  it('Modal Snapshot', () => {
    const modalUtil = render(<Modal>TEST</Modal>);
    expect(modalUtil.asFragment()).toMatchSnapshot();
  });
});
