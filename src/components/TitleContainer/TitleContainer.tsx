import styled from '@emotion/styled';

interface TitleContainer {
  title: string;
  description?: string;
}

export default function TitleContainer({ title, description }: TitleContainer) {
  return (
    <div>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </div>
  );
}

const Title = styled.h2({
  fontSize: '24px',
  fontWeight: '700',
  color: 'black',
});

const Description = styled.h3({
  fontSize: '12px',
  fontWeight: '500',
  color: '#0A0D13',
  marginTop: '12px',
});
