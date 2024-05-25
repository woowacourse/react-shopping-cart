import * as Styled from './style';
import CaptionEmoji from '../../assets/CaptionEmoji.svg';

interface CaptionProp {
  message: string;
}
const Caption = ({ message }: CaptionProp) => {
  return (
    <Styled.Caption>
      <img src={CaptionEmoji} />
      {message}
    </Styled.Caption>
  );
};

export default Caption;
