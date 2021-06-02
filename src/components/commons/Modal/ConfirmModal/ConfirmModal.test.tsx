import ConfirmModal from './ConfirmModal';
import { render } from '@testing-library/react';

describe('ConfirmModal Component', () => {
  it('ConfirmModal Snapshot', () => {
    const confirmModalUtil = render(
      <ConfirmModal heading="테스트 헤딩" cancelButtonText="취소" confirmButtonText="확인" />
    );
    expect(confirmModalUtil.asFragment()).toMatchSnapshot();
  });
});
