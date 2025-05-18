const ctx = canvas.getContext('2d');

function draw () {
	ctx.drawImage(image, 0, 0, image.width, image.height);
	ctx.drawImage(image, 0, image.height + 20, image.width, image.height);
}

window.addEventListener('load', () => {
	canvas.width = image.width;
	canvas.height = image.height * 2 + 20;
+
	draw();
});
