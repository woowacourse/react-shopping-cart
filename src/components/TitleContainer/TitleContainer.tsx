import styled from '@emotion/styled';

interface TitleContainerProps {
  title: string;
}

export default function TitleContainer({ title }: TitleContainerProps) {
  return <Title>{title}</Title>;
}

const Title = styled.h2({
  fontSize: '24px',
  fontWeight: '700',
  color: 'black',
});
