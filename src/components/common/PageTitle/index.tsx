import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";

interface PageTitleProps {
  title: string;
  subTitle: string;
}

const PageTitle = ({ title, subTitle }: PageTitleProps) => {
  return (
    <PageTitleContainer>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </PageTitleContainer>
  );
};

export default PageTitle;

const PageTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: ${FONT_SIZE.extraLarge};
  font-weight: ${FONT_WEIGHT.bold};
  color: ${COLOR.black};
`;

const SubTitle = styled.h3`
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  color: ${COLOR.black};
  white-space: pre-wrap;
  line-height: 18px;
`;
