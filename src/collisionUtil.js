export const touches = (aBounds, bBounds) => {
	const center = {};
	const otherCenter = {};
	const halfWidth = aBounds.width / 2;
	const halfHeight = aBounds.height / 2;
	const otherHalfWidth = bBounds.width / 2;
	const otherHalfHeight = bBounds.height / 2;

	center.x = aBounds.x + halfWidth;
	center.y = aBounds.y + halfHeight;
	otherCenter.x = bBounds.x + otherHalfWidth;
	otherCenter.y = bBounds.y + otherHalfHeight;

	const vx = center.x - otherCenter.x;
	const vy = center.y - otherCenter.y;

	const combinedHalfWidths = halfWidth + otherHalfWidth;
	const combinedHalfHeights = halfHeight + otherHalfHeight;

	return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights;
};
