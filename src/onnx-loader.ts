import * as ort from 'onnxruntime-web';

let session: ort.InferenceSession | null = null;

export async function loadModel(modelPath: string = './model_rgba.onnx'): Promise<void> {
  session = await ort.InferenceSession.create(modelPath, {
    executionProviders: ['wasm'],
  });
  console.log('ONNX model loaded!');
}

export function getSession(): ort.InferenceSession {
  if (!session) throw new Error('Model not loaded yet');
  return session;
}
