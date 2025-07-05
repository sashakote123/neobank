export const getCurrent = (
  position: number,
  sliderWidth: number,
  max: number,
  min: number
): number => {
  const length = max - min;

  return Math.floor(min + (length / (sliderWidth - 25)) * position);
};

export const getPosition = (
  current: number,
  sliderWidth: number,
  max: number,
  min: number
): number => {
  const length = max - min;
  const result = Math.floor((current - min) / (length / sliderWidth - 25));
  if (current <= min) return 0;
  else if (current >= max) return sliderWidth - 25;
  else return result;
};
