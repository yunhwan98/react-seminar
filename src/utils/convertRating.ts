export const convertRating = (rating: string) => {
	const end = rating.indexOf('%');
	if (end === -1) {
		return Math.ceil(Number(rating) / 0.5) * 0.5;
	}
	let result = Number(rating.slice(0, end));
	result = result / 20;
	console.log();
	return result;
};
