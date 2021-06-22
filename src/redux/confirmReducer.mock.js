const mockMessage = '하루심바의_쇼핑은_즐거워';

const mockApprove = () => console.log('approve 실행');

export const mockOpenPayload = {
  message: mockMessage,
  approve: mockApprove,
};

export const mockOpenState = {
  isOpen: true,
  ...mockOpenPayload,
};
