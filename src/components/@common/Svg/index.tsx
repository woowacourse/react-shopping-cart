type SvgIdProps = 'header-cart' | 'cart-icon' | 'error' | 'success';

interface SvgProps extends React.SVGAttributes<SVGElement> {
  type: SvgIdProps;
  width: number;
  height: number;
}

const Svg = ({ type, width, height, ...props }: SvgProps) => {
  return (
    <svg width={width} height={height} {...props}>
      <use href={`#${type}`} />
    </svg>
  );
};

export default Svg;
