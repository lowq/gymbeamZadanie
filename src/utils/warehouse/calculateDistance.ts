/**
 * Calculating distance between 2 vectors in 3D space
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} z1 - The z-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @param {number} z2 - The z-coordinate of the second point.
 * @returns {number} The Euclidean distance between the two points.
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
