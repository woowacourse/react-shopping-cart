import { InfoIcon } from '../../../assets';
import styled from '@emotion/styled';

export default function InfoParagraph({ children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <InfoContainer>
      <img src={InfoIcon} />
      {children}
    </InfoContainer>
  );
}

const InfoContainer = styled.p({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
  marginBottom: '12px',
  color: '#0A0D13',
  fontSize: '12px',
  fontWeight: '500',
});
