import styled from 'styled-components';
import Text from '../Text/Text';

type TitleProps = {
  title: string;
  description?: string;
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;

  width: 100%;
`;

const Title = ({ title, description }: TitleProps) => {
  return (
    <TitleContainer>
      <Text size="l" weight="l">
        {title}
      </Text>
      <Text size="s" weight="m">
        {description}
      </Text>
    </TitleContainer>
  );
};

export default Title;
