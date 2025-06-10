export function preprocessCanvas(canvas: HTMLCanvasElement): Float32Array | null {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return null;
  }
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  return new Float32Array(data);
}
