import { setupImageInput, drawMask } from './image-loader.js';
import { runInference } from './onnx-inference.js';
import { loadModel, getSession } from './onnx-loader.js';

(window as any).utils = {
  loadModel,
  getSession,
  drawMask,
  setupImageInput,
  runInference,
};
