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
$ npm install 
$ npm run build
```

A bundled .js file will be created in `./dist/` directory.

### Prepare Model
1. Download onnx model [here](https://github.com/k2-gc/ts-onnx-sample/releases/download/v1.0/model_rgba.onnx).
2. Place it in `./ts-onnx-sample/`.

### Run
Run live server from vscode and open index.html.
Then you'll find file input button and "Run Inference" button.

