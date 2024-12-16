export const validateImageUrlCorrectness = (
	imageUrl: string,
): Promise<boolean> => {
	return new Promise((resolve) => {
		if (!imageUrl) {
			resolve(false);
		}

		const img = new Image();
		img.onload = () => resolve(true);
		img.onerror = () => resolve(false);
		img.src = imageUrl;
	});
};
