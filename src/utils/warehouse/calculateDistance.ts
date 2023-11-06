/**
 * Calculating distance between 2 vectors in 3D space
 * @param x1 
 * @param y1 
 * @param z1 
 * @param x2 
 * @param y2 
 * @param z2 
 * @returns 
 */
export const calculateDistance = (
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
) => {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const deltaZ = z2 - z1;

  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

  return distance;
};
