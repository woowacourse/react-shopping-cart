type SvgIdProps = 'header-cart';

interface SvgProps {
  type: SvgIdProps;
  width: number;
  height: number;
}

const Svg = ({ type, width, height }: SvgProps) => {
  return (
    <svg width={width} height={height}>
      <use href={`#${type}`} />
    </svg>
  );
};

export default Svg;
