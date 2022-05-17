export function withOpacityValue(hexCode, opacity) {
  const red = hexCode.substring(1, 3);
  const green = hexCode.substring(3, 5);
  const blue = hexCode.substring(5);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
