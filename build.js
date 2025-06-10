// build.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/utils.ts'],
  bundle: true,
  outfile: './dist/utils.js',
  format: 'esm',
  platform: 'browser',
  target: ['es2022'],
  sourcemap: false,
  logLevel: 'info'
}).catch(() => process.exit(1));

// build.js の最後に追加
const fs = require('fs');
fs.copyFileSync(
  'node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm',
  'dist/ort-wasm-simd-threaded.jsep.wasm'
);
