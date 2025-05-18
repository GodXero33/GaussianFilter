const gussianKernel = [
	[1, 2, 1],
	[2, 4, 2],
	[1, 2, 1]
];

function getImageData (imageData) {
	const width = imageData.width;
	const height = imageData.height;

	const data = imageData.data;
	const pixels = Array.from({ length: height }, () => Array.from({ length: width }, () => { return { r: 0, g: 0, b: 0, a: 0 } }));

	for (let a = 0; a < data.length; a += 4) {
		const x = (a / 4) % width;
		const y = Math.floor((a / 4) / width);
		const pixel = pixels[y][x];

		pixel.r = data[a];
		pixel.g = data[a + 1];
		pixel.b = data[a + 2];
		pixel.a = data[a + 3];
	}

	return pixels;
}

function getImageFromPixelsData (pixels) {
	const width = pixels[0].length;
	const height = pixels.length;

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;

	const imageData = ctx.getImageData(0, 0, width, height);
	const data = imageData.data;

	for (let a = 0; a < height; a++) {
		for (let b = 0; b < width; b++) {
			const index = (a * width + b) * 4;
			const pixel = pixels[a][b];

			data[index] = pixel.r;
			data[index + 1] = pixel.g;
			data[index + 2] = pixel.b;
			data[index + 3] = pixel.a;
		}
	}

	ctx.putImageData(imageData, 0, 0);

	const image = new Image();
	image.src = canvas.toDataURL();

	return image;
}

function toBase64 (sourceImage) {
	return new Promise((resolve, _) => {
		const image = new Image();

		image.crossOrigin = 'anonymous';
		image.src = sourceImage.src;

		image.addEventListener('load', () => {
			const width = image.width;
			const height = image.height;

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			canvas.width = width;
			canvas.height = height;

			ctx.drawImage(image, 0, 0, width, height);
			resolve(canvas.toDataURL());
		});
	});
}

function applyGassianForPixel (x, y, pixels, newPixels) {
	let tr = 0;
	let tg = 0;
	let tb = 0;
	let ta = 0;

	for (let a = -1; a < 2; a++) {
		for (let b = -1; b < 2; b++) {
			let px = x + b;
			let py = y + a;

			if (px < 0) px = 0;
			if (px > pixels[0].length - 1) px = pixels[0].length - 1;
			if (py < 0) py = 0;
			if (py > pixels.length - 1) py = pixels.length - 1;

			const kernel = gussianKernel[a + 1][b + 1];
			const pixel = pixels[py][px];

			tr += pixel.r * kernel;
			tg += pixel.g * kernel;
			tb += pixel.b * kernel;
			ta += pixel.a * kernel;
		}
	}

	const newPixel = newPixels[y][x];
	const kernelWeight = gussianKernel.flat().reduce((a, b) => a + b, 0);

	newPixel.r = Math.floor(tr / kernelWeight);
	newPixel.g = Math.floor(tg / kernelWeight);
	newPixel.b = Math.floor(tb / kernelWeight);
	newPixel.a = Math.floor(ta / kernelWeight);
}

function applyGassianForPixels (pixels) {
	const width = pixels[0].length;
	const height = pixels.length;
	const newPixels = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
		const pixel = pixels[y][x];

		return {
			r: pixel.r,
			g: pixel.g,
			b: pixel.b,
			a: pixel.a
		};
	}));

	for (let y = 0; y < height; y++)
		for (let x = 0; x < width; x++)
			applyGassianForPixel(x, y, pixels, newPixels);

	return newPixels;
}

function gassianFilter (imageData) {
	return getImageFromPixelsData(applyGassianForPixels(getImageData(imageData)));
}

export {
	gassianFilter,
	toBase64
};
