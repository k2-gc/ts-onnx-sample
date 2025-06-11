// build.js
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const outdir = path.resolve(__dirname, 'dist');

// dist ディレクトリがなければ作成
if (!fs.existsSync(outdir)) {
  fs.mkdirSync(outdir);
  console.log('Created dist directory');
}

esbuild
  .build({
    entryPoints: ['./src/utils.ts'],
    bundle: true,
    outfile: './dist/utils.js',
    format: 'esm',
    platform: 'browser',
    target: ['es2022'],
    sourcemap: false,
    logLevel: 'info',
  })
  .catch(() => process.exit(1));

// build.js の最後に追加
fs.copyFileSync(
  'node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.wasm',
  'dist/ort-wasm-simd-threaded.jsep.wasm'
);
