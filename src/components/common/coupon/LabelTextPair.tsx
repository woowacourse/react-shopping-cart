export type labelTextPairType = [string, string];

function LabelTextPair({
  labelTextPairArray,
}: {
  labelTextPairArray: [string, string];
}) {
  const [label, text] = labelTextPairArray;
  return (
    <p style={{ fontSize: "14px" }}>
      {label}: {text}
    </p>
  );
}

export default LabelTextPair;
