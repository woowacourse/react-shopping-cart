import { InfoIcon } from '../../../assets';
import * as S from './NotificationContainer.style';

interface NotificationContainerProps {
  content: string;
}

function NotificationContainer({ content, ...rest }: NotificationContainerProps) {
  return (
    <S.NotificationContainer {...rest}>
      <S.InfoIcon src={InfoIcon} />
      <p>{content}</p>
    </S.NotificationContainer>
  );
}

export default NotificationContainer;
