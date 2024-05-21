import * as S from './styled';

interface ShoppingCartDescriptionProps {
  title: string;
  descriptionShowingCondition: boolean;
  description: string;
}

const ShoppingCartDescription = ({
  title,
  descriptionShowingCondition,
  description,
}: ShoppingCartDescriptionProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {descriptionShowingCondition && <S.Description>{description}</S.Description>}
    </S.Container>
  );
};

export default ShoppingCartDescription;
