type SvgIdProps = 'header-cart' | 'cart-icon';

interface SvgProps {
  type: SvgIdProps;
  width: number;
  height: number;
}

const Svg = ({ type, width, height }: SvgProps) => {
  return (
    <svg width={width} height={height} cursor="pointer">
      <use href={`#${type}`} />
    </svg>
  );
};

export default Svg;
