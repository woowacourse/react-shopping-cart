import ContentLayout from 'components/@common/ContentLayout';
import { styled } from 'styled-components';

const NotFound = () => {
  return (
    <ContentLayout>
      <Wrapper>
        <img src={process.env.PUBLIC_URL + '/error.png'} />
        <Text>이동하려는 페이지가 존재하지 않습니다.</Text>
      </Wrapper>
    </ContentLayout>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  font: ${(props) => props.theme.font.medium};
`;

export default NotFound;
