# ts-onnx-sample

This repository shows sample onnx inference code using TypeScript.


## Prerequisites
* node v20.19.1
* npm 11.3.0
* npx 11.3.0
* vscode Live Server

## Sample Model
| item | description |
| :-: | :-: |
| task | semantic segmentation |
| class | giraffe/zebra | 
|train | pytorch |
|inference | ONNX |

Pretrained model was trained with pytorch and then exported to onnx including preprocess and postprocess.

## Usage
### Build
```bash
$ npm init -y
$ npm install typescript onnxruntime-web esbuild --save-dev
$ npx tsc --init
$ mkdir dist
$ npm run build
```

A bundled .js file will be created in `./dist/` directory.

### Run
Run live server from vscode and open index.html.
Then you'll find file input button and "Run Inference" button.

