import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const imageUrl =
  'https://user-images.githubusercontent.com/24777828/233794760-2bc92a8d-4439-4dff-a46d-54f9311bffac.JPG';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Style.Container>
      <Style.Image src={imageUrl} alt="페이지를 찾을 수 없습니다." />
      <Style.Title>길을 잃으셨나요?</Style.Title>
      <Style.Content>
        {
          '방문하시려는 페이지의 주소가 잘못 입력되었거나,\n페이지 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.\n입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.\n\n관련 문의사항은 '
        }
        <Style.Email href="mailto:chex1004@gmail.com">고객센터</Style.Email>
        {'에 연락주시면 친절하게 안내해드리겠습니다.\n\n감사합니다.'}
      </Style.Content>
      <Style.HomeButton onClick={() => navigate('/')}>홈으로 가기</Style.HomeButton>
    </Style.Container>
  );
}

const Style = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    padding: 30px;
    border-radius: 8px;
  `,

  Title: styled.span`
    margin-top: 30px;

    font-size: 30px;
    font-weight: bold;
    text-align: justify;
  `,

  Content: styled.p`
    margin-top: 10px;
    margin-bottom: 20px;

    font-size: 16px;
    text-align: justify;
    color: var(--grey-600);
    white-space: pre-line;
  `,

  Image: styled.img`
    display: block;

    width: 200px;
    border-radius: 10px;
  `,

  Email: styled.a`
    color: orange;

    &:hover,
    &:focus {
      color: green;
    }
  `,

  HomeButton: styled.button`
    width: 200px;
    height: 50px;

    border-radius: 7px;
    background-color: orange;
    color: black;
  `,
};
