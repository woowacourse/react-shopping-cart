import { SVG } from './CloseIcon.styles';

interface CloseIconProps {
  scale: string;
}

const CloseIcon = ({ scale = '1.0' }: CloseIconProps) => (
  <SVG viewBox="0 0 40 40" scale={scale}>
    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </SVG>
);

export default CloseIcon;
export type { CloseIconProps };
