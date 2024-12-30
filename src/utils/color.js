/**
 *  生成随机色值
 */

export const randomRGB = () => {
  const r = Math.ceil(Math.random() * 255);
  const g = Math.ceil(Math.random() * 255);
  const b = Math.ceil(Math.random() * 255);
  return `rgba(${r},${g},${b},0.8)`;
};
