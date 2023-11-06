export interface Position {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
}

export interface CalculatedPosition {
  positionId: string;
  productId: string;
  distance: number;
}
