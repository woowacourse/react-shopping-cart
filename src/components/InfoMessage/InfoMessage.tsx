import { Info } from '../../assets';
import Text from '../common/Text/Text';
import { InfoMessageStyle } from './InfoMessage.styles';

function InfoMessage({ message }: { message: string }) {
  return (
    <div css={InfoMessageStyle}>
      <img src={Info} alt="info" />
      <Text varient="caption">{message}</Text>
    </div>
  );
}

export default InfoMessage;
