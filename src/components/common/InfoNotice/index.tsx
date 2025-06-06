import styled from '@emotion/styled';

interface InfoNoticeProps {
  iconSrc: string;
  altText?: string;
  children: React.ReactNode;
}

const InfoNotice = ({
  iconSrc,
  altText = '알림 아이콘',
  children,
}: InfoNoticeProps) => {
  return (
    <Container>
      <Icon src={iconSrc} alt={altText} />
      <Message>{children}</Message>
    </Container>
  );
};

export default InfoNotice;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
`;

const Icon = styled.img`
  width: 14px;
  height: 14px;
`;

const Message = styled.p`
  font-size: 12px;
  font-weight: 500;
`;
