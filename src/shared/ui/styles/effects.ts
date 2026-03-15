export function boxShadow(
  offsetX: number,
  offsetY: number,
  blurRadius: number,
  color: string,
  spread = 0,
) {
  return `${offsetX}px ${offsetY}px ${blurRadius}px ${spread}px ${color}`;
}

export function textShadow(
  offsetX: number,
  offsetY: number,
  blurRadius: number,
  color: string,
) {
  return `${offsetX}px ${offsetY}px ${blurRadius}px ${color}`;
}
