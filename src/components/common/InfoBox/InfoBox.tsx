import { InfoIcon } from '../../../assets';
import * as Styled from './InfoBox.style';

interface InfoBoxProps extends React.HTMLAttributes<HTMLParagraphElement> {
  alt: string;
  text: string;
}

export default function InfoBox({ alt, text, ...props }: InfoBoxProps) {
  return (
    <Styled.InfoBox {...props}>
      <img src={InfoIcon} alt={alt} />
      {text}
    </Styled.InfoBox>
  );
}
