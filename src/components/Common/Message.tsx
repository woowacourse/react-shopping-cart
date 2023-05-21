import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { MESSAGE, MessageKey } from '../../constants/message';

interface MessageProps {
  type: MessageKey;
  link?: boolean;
}

const Message = ({ type, link = false }: MessageProps) => {
  return (
    <MessageSection>
      <img
        width={160}
        height={160}
        src={MESSAGE[type].imageSrc}
        alt={MESSAGE[type].title}
      />
      <MessageTitle>{MESSAGE[type].title}</MessageTitle>
      <MessageDesc>{MESSAGE[type].description}</MessageDesc>
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
