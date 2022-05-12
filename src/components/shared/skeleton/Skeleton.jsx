import {
  StyledProductContainer,
  StyledProductItem,
  StyledProductImage,
  StyledProductText,
} from 'components/shared/skeleton/style';

const Skeleton = () => {
  return (
    <StyledProductItem>
      <StyledProductImage></StyledProductImage>
      <StyledProductContainer>
        <StyledProductText name="true" />
        <StyledProductText price="true" />
      </StyledProductContainer>
    </StyledProductItem>
  );
};

export default Skeleton;
