interface HorizontalLineProps {
  color?: string;
  height?: number;
  marginBottom?: number;
  marginTop?: number;
  opacity?: number;
}

export const HorizontalLine = ({
  color = 'black',
  height = 1,
  marginTop = 0,
  marginBottom = 0,
  opacity = 1,
}: HorizontalLineProps) => {
  return (
    <div
      style={{
        backgroundColor: color,
        marginBottom: `${marginBottom}px`,
        marginTop: `${marginTop}px`,
        height: `${height}px`,
        width: '100%',
        opacity,
      }}
    />
  );
};
