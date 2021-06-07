import { FC, ReactEventHandler } from 'react';
import { CardContainer } from './style';

export type CardType = 'horizontal' | 'vertical';

interface Props {
  children: React.ReactNode;
  image: string;
  type: CardType;
  className?: string;
  width?: string;
  height?: string;
  alt?: string;
}

const Card: FC<Props> = ({ children, image, alt, type, width, height, className }) => {
  return (
    <CardContainer className={className} type={type} width={width} height={height}>
      <img src={image} alt={alt} onError={onErrorImage} />
      {children}
    </CardContainer>
  );
};

export default Card;

const onErrorImage: ReactEventHandler<HTMLImageElement> = (event) => {
  event.currentTarget.src = process.env.PUBLIC_URL + '/images/no-image.png';
};
