import styled from "styled-components";

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
  font-size: 24px;
  font-weight: 700;
  color: black;
`;

const SubTitle = styled.h3`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;
