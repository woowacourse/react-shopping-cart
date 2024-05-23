import { InfoIcon } from '../../../assets';
import * as S from './NotificationLabel.style';

interface NotificationLabelProps {
  text?: string;
}

function NotificationLabel({ text = '' }: NotificationLabelProps) {
  return (
    <S.Layout>
      <S.InfoIcon src={InfoIcon} />
      <p>{text}</p>
    </S.Layout>
  );
}

export default NotificationLabel;
