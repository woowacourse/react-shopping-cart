import { FC } from 'react';
import { CardContainer } from './style';

export type CardType = 'horizontal' | 'vertical';

interface Props {
  children: React.ReactNode;
  imgSrc: string;
  type: CardType;
  width: string;
  height: string;
  alt?: string;
}

const Card: FC<Props> = ({ children, imgSrc, alt, type, width, height }) => {
  return (
    <CardContainer type={type} width={width} height={height}>
      <img src={imgSrc} alt={alt} />
      {children}
    </CardContainer>
  );
};

export default Card;
