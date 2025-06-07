export type labelTextPairType = [string, string] | null;

function LabelTextPair({
  labelTextPairArray,
}: {
  labelTextPairArray: labelTextPairType;
}) {
  if (!labelTextPairArray) return null;
  const [label, text] = labelTextPairArray;
  return (
    <p style={{ fontSize: "14px" }}>
      {label}: {text}
    </p>
  );
}

export default LabelTextPair;
