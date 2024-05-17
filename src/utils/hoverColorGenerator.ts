const hoverColorGenerator = (backgroundColor: string) => {
  const bigint = parseInt(backgroundColor.slice(1, 7), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const adjustColor = (color: number, adjustment: number) => {
    const newColor = color + adjustment;
    return Math.min(255, Math.max(0, newColor)).toString(16).padStart(2, '0');
  };

  const adjustment = r + g + b <= 384 ? 24 : -24;
  const R = adjustColor(r, adjustment);
  const G = adjustColor(g, adjustment);
  const B = adjustColor(b, adjustment);

  return '#' + R + G + B;
};

export default hoverColorGenerator;
