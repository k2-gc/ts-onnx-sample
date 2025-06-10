import * as ort from 'onnxruntime-web';

export function postprocessToMask(tensor: ort.Tensor, classIndex: number = 0): ImageData {
  const [_, C, H, W] = tensor.dims;
  const data = tensor.data as Float32Array;

  const imageData = new Uint8ClampedArray(W * H * 4);

  for (let y: number = 0; y < H; y++) {
    for (let x: number = 0; x < W; x++) {
      const i = y * W + x;
      const v = data[classIndex * H * W + i];
      const p = Math.min(255, Math.max(0, v * 255));

      imageData[i * 4 + 0] = p;
      imageData[i * 4 + 1] = p;
      imageData[i * 4 + 2] = p;
      imageData[i * 4 + 3] = 255;
    }
  }

  return new ImageData(imageData, W, H);
}
