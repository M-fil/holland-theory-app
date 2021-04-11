type OpacityType = string | number;

export const compareRGBAValues = (
  color1: string, color2: string, opacity: OpacityType, activeOpacity: OpacityType,
): boolean => {
  const modifiedColor1 = (color1 || '').replace(String(opacity), String(activeOpacity));
  const modifiedColor2 = (color2 || '').replace(String(opacity), String(activeOpacity));

  return modifiedColor1 === modifiedColor2;
};