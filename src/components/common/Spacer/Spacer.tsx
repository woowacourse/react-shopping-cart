interface SpacerProp {
  height: number
}

const Spacer = ({ height }: SpacerProp) => {
  return <div style={{ height: `${height}px`, width: '100%' }} />
}

export default Spacer