interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer = ({ width = 1, height = 1 }: SpacerProps) => {
  return (
    <div
      style={{
        width,
        height,
      }}
    />
  );
};

export default Spacer;
