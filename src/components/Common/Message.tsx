import { Link } from 'react-router-dom';
import styled from 'styled-components';

type MessageType = 'error' | 'empty' | 'notFound' | 'loading';

interface MessageProps {
  type: MessageType;
  link?: boolean;
}

const message = {
  error: {
    title: '에러가 발생했습니다.',
    description: '새로고침 해주세요.',
    imageSrc: 'images/error.png',
  },
  empty: {
    title: '상품을 찾을 수 없습니다.',
    description: '새로고침 해주세요.',
    imageSrc: 'images/error.png',
  },
  notFound: {
    title: '페이지를 찾을 수 없습니다.',
    description: '페이지가 존재하지 않거나 삭제되어 찾을 수 없어요.',
    imageSrc: 'images/error.png',
  },
  loading: {
    title: '로딩중입니다. ',
    description: '잠시만 기다려주세요.',
    imageSrc: 'images/loading.png',
  },
};

const Message = ({ type, link = false }: MessageProps) => {
  return (
    <MessageSection>
      <img
        width={160}
        height={160}
        src={message[type].imageSrc}
        alt='오류 발생 이미지'
      />
      <MessageTitle>{message[type].title}</MessageTitle>
      <MessageDesc>{message[type].description}</MessageDesc>
      {link && <HomeLink to='/'>홈으로 가기</HomeLink>}
    </MessageSection>
  );
};

const MessageSection = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  transform: translate(-50%, -50%);
`;

const MessageTitle = styled.h2`
  margin: 16px 0 0 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
`;

const MessageDesc = styled.p`
  margin: 8px 0 0 0;
`;

const HomeLink = styled(Link)`
  width: 100px;
  height: 40px;
  margin: 36px 0 0 0;
  text-align: center;
  line-height: 40px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
`;

export default Message;
