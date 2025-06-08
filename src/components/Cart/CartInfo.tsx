import styled from '@emotion/styled';
import { infoIcon } from '../../assets';

interface CartInfoProps {
  description?: string;
  style?: React.CSSProperties;
}

function CartInfo({ description, style }: CartInfoProps) {
  return (
    <Container style={style}>
      <InfoIconImage src={infoIcon} alt="infoIcon" />
      <p>{description}</p>
    </Container>
  );
}

export default CartInfo;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin: 52px 0 13px 0;
`;

const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;
