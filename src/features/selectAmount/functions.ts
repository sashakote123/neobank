export const getCurrent = (
  position: number,
  sliderWidth: number,
  thumbWidth: number,
  max: number,
  min: number
): number => {
  const length = max - min;

  return Math.floor(min + (length / (sliderWidth - thumbWidth)) * position);
};

export const getPosition = (
  current: number,
  sliderWidth: number,
  thumbWidth: number,

  max: number,
  min: number
): number => {
  console.log(sliderWidth);
  const length = max - min;
  const result = Math.floor(
    (current - min) / (length / sliderWidth - thumbWidth)
  );
  if (current <= min) return 0;
  else if (current >= max) return sliderWidth - thumbWidth;
  else return result;
};
