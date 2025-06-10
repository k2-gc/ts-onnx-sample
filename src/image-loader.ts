async function loadImageToCanvas(
  input: HTMLInputElement,
  canvas: HTMLCanvasElement
): Promise<void> {
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
    };
    img.src = e.target?.result as string;
  };

  reader.readAsDataURL(file);
}

export function setupImageInput(inputId: string, canvasId: string): void {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!input || !canvas) {
    console.warn('input or canvas not found!');
    return;
  }

  input.addEventListener('change', () => {
    loadImageToCanvas(input, canvas);
  });
  console.log('Setup done');
}

export function drawMask(canvasId: string, mask: ImageData): void {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

  if (!canvas) {
    console.warn('input or canvas not found!');
    return;
  }
  canvas.width = mask.width;
  canvas.height = mask.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.putImageData(mask, 0, 0);
}
