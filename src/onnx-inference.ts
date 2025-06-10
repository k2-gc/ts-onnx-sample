import * as ort from 'onnxruntime-web';
import { getSession } from './onnx-loader.js';
import { postprocessToMask } from './postprocess.js';
import { preprocessCanvas } from './preprocess.js';

function resizeCanvasSize(
  canvas: HTMLCanvasElement,
  targetWidth: number,
  targetHeight: number
): HTMLCanvasElement {
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = targetWidth;
  resizedCanvas.height = targetHeight;

  const ctx = resizedCanvas.getContext('2d');
  ctx?.drawImage(canvas, 0, 0, targetWidth, targetHeight);

  return resizedCanvas;
}

function resizeImage(src: ImageData, targetWidth: number, targetHeight: number): ImageData | null {
  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = src.width;
  srcCanvas.height = src.height;
  const srcCtx = srcCanvas.getContext('2d');
  srcCtx?.putImageData(src, 0, 0);

  const dstCanvas = document.createElement('canvas');
  dstCanvas.width = targetWidth;
  dstCanvas.height = targetHeight;
  const dstCtx = dstCanvas.getContext('2d');
  if (!dstCtx) {
    return null;
  }
  dstCtx.drawImage(srcCanvas, 0, 0, targetWidth, targetHeight);
  console.log(targetWidth, targetHeight);
  return dstCtx.getImageData(0, 0, targetWidth, targetHeight);
}

export async function runInference(canvas: HTMLCanvasElement): Promise<ImageData | null> {
  const session = getSession();
  const inputName = session.inputNames[0];
  const metadataArray = session.inputMetadata as any[];
  const inputMeta = metadataArray[0];
  const inputShape = inputMeta.shape;
  const [_, H, W, __] = inputShape;
  const originalCanvasWidth = canvas.width;
  const originalCanvasHeight = canvas.height;

  const resizedCanvas = resizeCanvasSize(canvas, W, H);
  const inputData = preprocessCanvas(resizedCanvas);
  if (!inputData) return null;

  const inputTensor = new ort.Tensor('float32', inputData, [1, H, W, 4]);

  const feeds: Record<string, ort.Tensor> = {};
  feeds[session.inputNames[0]] = inputTensor;
  const results = await session.run(feeds);
  const output = results[session.outputNames[0]];

  const mask = postprocessToMask(output);
  const resizedMask = resizeImage(mask, originalCanvasWidth, originalCanvasHeight);
  return resizedMask;
}
