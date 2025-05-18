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

function getImageFromData (pixels) {
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
	return new Promise((resolve, reject) => {
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

function gassianFilter (imageData) {
	return getImageFromData(getImageData(imageData));
}

export {
	gassianFilter,
	toBase64
};
