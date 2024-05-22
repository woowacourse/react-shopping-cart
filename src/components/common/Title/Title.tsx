import Text from '../Text/Text';
import * as S from './Title.style'

type TitleProps = {
  title: string;
  description?: string;
};

const Title = ({ title, description }: TitleProps) => {
  return (
    <S.TitleContainer>
      <Text size="l" weight="l">
        {title}
      </Text>
      <Text size="s" weight="m">
        {description}
      </Text>
    </S.TitleContainer>
  );
};

export default Title;
