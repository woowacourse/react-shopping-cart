import { SerializedStyles } from '@emotion/react';

export type ModalPosition = 'center' | 'top' | 'bottom';
export type ModalSize = 'small' | 'medium' | 'large';
export type ButtonAlign = 'left' | 'center' | 'right';

export interface ChildrenProps {
  /** 자식 요소 (JSX.Element 또는 문자열 등) */
  children: React.ReactNode;
}

export interface ModalProps extends ChildrenProps {
  /** 모달을 보여줄지 여부 */
  show: boolean;

  /** 모달을 닫는 함수 (배경 클릭이나 X 버튼 클릭 시 호출) */
  onHide: () => void;

  /** 배경 어두움 여부  */
  showBackdrop?: boolean;

  /** 모달 위치 설정: 가운데(center), 상단(top), 하단(bottom) */
  position?: ModalPosition;

  /**모달의 넓이를 설정 */
  size?: ModalSize;
}

export interface ModalHeaderProps extends ChildrenProps {
  /** 닫기 버튼(X)을 표시할지 여부 */
  closeButton?: boolean;
}

export interface ModalBodyProps extends ChildrenProps {
  /** 모달의 높이를 설정 */
  height?: number;
  /** 모달의 넓이를 설정 */
  width?: string;
}

export interface ModalTitleProps extends ChildrenProps {
  /** 텍스트 색상 설정 */
  color?: string;
}

export interface ModalFooterProps extends ChildrenProps {
  buttonAlign?: ButtonAlign;
}

export interface ModalContextType {
  onHide: () => void;
}

export interface ModalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  css?: SerializedStyles;
}
