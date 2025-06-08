import styled from '@emotion/styled';

interface InfoLabelProps {
  description: string;
}

export default function InfoLabel({ description }: InfoLabelProps) {
  return (
    <InfoLabelContainer>
      <InfoIcon src="./infoLabelIcon.svg" alt="InfoLabel Icon" />
      {description}
    </InfoLabelContainer>
  );
}

export const InfoLabelContainer = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
`;

export const InfoIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 6px;
  vertical-align: middle;
`;
