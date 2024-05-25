import ImageBox from '../common/ImageBox/ImageBox';
import Text from '../common/Text/Text';
import * as S from './NoticeMessage.style';
import NOTICE from '../../assets/notice.svg';

const NoticeMessage = ({ message }: { message: string }) => {
  return (
    <S.NoticeContainer>
      <ImageBox src={NOTICE} width={16} height={16} border="none" />
      <Text size="s" weight="m">
        {message}
      </Text>
    </S.NoticeContainer>
  );
};

export default NoticeMessage;
