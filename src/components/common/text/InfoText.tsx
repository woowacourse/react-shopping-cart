import styled from "@emotion/styled";

function InfoText({ contentText }: { contentText: string }) {
  return (
    <InfoBox>
      <InfoIcon src="./assets/icons/Info.svg" alt="info 아이콘" />
      <InfoMessage>{contentText}</InfoMessage>
    </InfoBox>
  );
}

export default InfoText;

const InfoBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 14px;
`;
const InfoMessage = styled.p`
  font-size: 12px;
  font-weight: 500;
`;

const InfoIcon = styled.img`
  width: 14px;
  height: 14px;
`;
