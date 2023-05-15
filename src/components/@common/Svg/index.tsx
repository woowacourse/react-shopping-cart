type SvgIdProps = 'header-cart' | 'cart-icon' | 'error' | 'success';

interface SvgProps extends React.SVGAttributes<SVGElement> {
  type: SvgIdProps;
  width: number;
  height: number;
  isClickable:boolean;
}

const Svg = ({ type, width, height,isClickable, ...props }: SvgProps) => {
  return (
    <svg width={width} height={height} cursor={isClickable ? "cursor" : "default"} {...props}>
      <use href={`#${type}`} />
    </svg>
  );
};

export default Svg;
