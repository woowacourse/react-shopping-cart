import styled from "@emotion/styled";

export type labelTextPairType = [string, string] | null;

function LabelTextPair({
  labelTextPairArray,
}: {
  labelTextPairArray: labelTextPairType;
}) {
  if (!labelTextPairArray) return null;
  const [label, text] = labelTextPairArray;
  return (
    <Text>
      {label}: {text}
    </Text>
  );
}

export default LabelTextPair;

const Text = styled.p`
  font-size: 14px;
`;
