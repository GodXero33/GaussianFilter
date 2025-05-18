import { gassianFilter, toBase64 } from "./gassian-filter.js";

const ctx = canvas.getContext('2d');
const image = new Image();

function draw () {
	ctx.drawImage(image, 0, 0, image.width, image.height);

	const imageData = ctx.getImageData(0, 0, image.width, image.height);

	const filteredImage = gassianFilter(imageData);

	ctx.drawImage(filteredImage, 0, image.height + 20, image.width, image.height);
}

imgOriginal.addEventListener('load', async () => {
	image.src = await toBase64(imgOriginal);

	image.addEventListener('load', () => {
		canvas.width = image.width;
		canvas.height = image.height * 2 + 20;

		draw();
	});
});
