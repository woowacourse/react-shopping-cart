import styled from '@emotion/styled';
import { Text } from '../Text/Text';

const EmptyList = ({ text }: { text: string }) => {
  return (
    <EmptyListWrapper>
      <EmptyListImg
        src="https://cdn-mart.baemin.com/front-end/assets/20230531171602/images/defaultEmptyImage.11f8bc33139d72b546eb54f5b89e2abf.png"
        alt="empty list"
      />
      <Text size="small" weight="normal">
        {text}
      </Text>
    </EmptyListWrapper>
  );
};

export default EmptyList;

const EmptyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const EmptyListImg = styled.img`
  width: 160px;
  height: 160px;
  margin: 0 0 16px;
`;
