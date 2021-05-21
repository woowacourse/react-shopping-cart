import { FC } from 'react';
import { CardContainer } from './style';

export type CardType = 'horizontal' | 'vertical';

interface Props {
  className?: string;
  children: React.ReactNode;
  image: string;
  type: CardType;
  width?: string;
  height?: string;
  alt?: string;
}

const Card: FC<Props> = ({ children, image, alt, type, width, height, className }) => {
  return (
    <CardContainer className={className} type={type} width={width} height={height}>
      <img src={image} alt={alt} />
      {children}
    </CardContainer>
  );
};

export default Card;
