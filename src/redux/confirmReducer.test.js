import {
  OPEN_CONFIRM,
  CLOSE_CONFIRM,
  confirmAction,
  INITIAL_STATE,
  confirmReducer,
} from './confirmReducer';

const mockMessage = '하루심바의_쇼핑은_즐거워';
const mockApprove = () => console.log('approve 실행');

const mockOpenPayload = {
  message: mockMessage,
  approve: mockApprove,
};
const mockOpenState = {
  isOpened: true,
  ...mockOpenPayload,
};

describe('confirmReducer 테스트', () => {
  /* 컨펌창 열기 */
  it('openConfirm 함수는 OPEN_CONFIRM 타입의 액션을 생성한다.', () => {
    expect(confirmAction.openConfirm(mockOpenPayload)).toEqual({
      type: OPEN_CONFIRM,
      payload: mockOpenPayload,
    });
  });

  it('OPEN_CONFIRM 액션을 받을 경우, confirmReducer 해당 PRODUCT를 추가한 state를 반환한다.', () => {
    const prevState = INITIAL_STATE;
    const nextState = mockOpenState;

    expect(confirmReducer(prevState, confirmAction.openConfirm(mockOpenPayload))).toEqual(
      nextState
    );
  });

  /* 컨펌창 닫기 */
  it('closeConfirm 함수는 CLOSE_CONFIRM 타입의 액션을 생성한다.', () => {
    expect(confirmAction.closeConfirm()).toEqual({ type: CLOSE_CONFIRM });
  });

  it('closeConfirm 액션을 받을 경우, confirmReducer 해당 PRODUCT를 추가한 state를 반환한다.', () => {
    const prevState = mockOpenState;
    const nextState = INITIAL_STATE;

    expect(confirmReducer(prevState, confirmAction.closeConfirm())).toEqual(nextState);
  });
});
