import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const TitleStyle = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3.475rem;
  text-align: left;
`;

const SubTitleStyle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
`;

interface TitleProps {
  title: string;
  subTitle?: string;
}

function Title({ title, subTitle }: TitleProps) {
  return (
    <TitleContainer>
      <TitleStyle>{title}</TitleStyle>
      <SubTitleStyle>{subTitle}</SubTitleStyle>
    </TitleContainer>
  );
}

export default Title;
