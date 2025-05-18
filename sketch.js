import { gassianFilter, toBase64 } from "./gassian-filter.js";

const ctx = canvas.getContext('2d');
const imgOriginal = new Image();

imgOriginal.src = 'https://picsum.photos/500/300';

const image = new Image();
let filteredImage = null;

let mouseX = 0;
let mouseY = 0;

function resize () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function draw () {
	requestAnimationFrame(draw);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (!filteredImage) return;

	ctx.drawImage(image, 0, 0, mouseX, image.height, 0, 0, mouseX, image.height);
	ctx.drawImage(filteredImage, mouseX, 0, image.width - mouseX, image.height, mouseX, 0, image.width - mouseX, image.height);

	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.moveTo(mouseX, 0);
	ctx.lineTo(mouseX, canvas.height);
	ctx.stroke();
}

draw();
resize();

function getFilteredImage () {
	const canvasTmp = document.createElement('canvas');
	const ctxTmp = canvasTmp.getContext('2d');

	canvasTmp.width = image.width;
	canvasTmp.height = image.height;

	ctxTmp.drawImage(image, 0, 0, image.width, image.height);

	const imageData = ctxTmp.getImageData(0, 0, image.width, image.height);

	return gassianFilter(imageData);
}

imgOriginal.addEventListener('load', async () => {
	image.addEventListener('load', () => {
		filteredImage = getFilteredImage();
	});

	image.src = await toBase64(imgOriginal);

});

window.addEventListener('mousemove', event => {
	mouseX = event.x;
	mouseY = event.y;
});

window.addEventListener('resize', resize);
