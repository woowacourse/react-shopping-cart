import styled from '@emotion/styled';
import { Text } from '../Text/Text';

interface TextListProps {
  label: string;
  text: string;
  primary?: boolean;
}

const TextList = ({ label, text, primary }: TextListProps) => {
  return (
    <TextListWrapper>
      <Text size="smallest" weight="light">
        {label}
      </Text>
      <Text
        size={primary ? 'small' : 'smallest'}
        weight={primary ? 'bold' : 'light'}
        color={primary ? '#04C09E' : undefined}
      >
        {text}
      </Text>
    </TextListWrapper>
  );
};

export default TextList;

const TextListWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
`;
