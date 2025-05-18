# Gaussian Filter (JS)

Apply a simple Gaussian blur to images using pure JavaScript. No dependencies. Plug and play.

## CDN

```html
<script type="module">
  import { gassianFilter, toBase64 } from "https://cdn.jsdelivr.net/gh/GodXero33/GaussianFilter@main/gassian-filter.js";
</script>
```

## Usage

```js
import { gassianFilter, toBase64 } from "./gassian-filter.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = 'https://picsum.photos/500/300';

image.onload = async () => {
  const base64 = await toBase64(image);

  const tmpCanvas = document.createElement('canvas');
  const tmpCtx = tmpCanvas.getContext('2d');

  tmpCanvas.width = image.width;
  tmpCanvas.height = image.height;
  tmpCtx.drawImage(image, 0, 0);

  const imageData = tmpCtx.getImageData(0, 0, image.width, image.height);
  const blurredImage = gassianFilter(imageData);

  // draw to screen
  ctx.drawImage(blurredImage, 0, 0);
};
```

## Functions

* `gassianFilter(imageData)` → returns blurred image (`<img>`)
* `toBase64(image)` → returns base64 string of image

#### Live Demo [Gaussian Filter]([https://github.com/GodXero33](https://godxero33.github.io/GaussianFilter/)
#### Made by [@GodXero](https://github.com/GodXero33)
