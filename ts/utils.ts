export function generateVideoTitle(tags: string, duration: number): string {
	const tagList = tags.split(',').map((tag) => tag.trim());

	// Pick a few meaningful words (up to 3)
	const keywords = tagList
		.filter((tag) => tag.length > 3) // Ignore short tags
		.slice(0, 3)
		.map((tag) => capitalize(tag));

	// Optional: Add descriptor based on duration
	const lengthDesc = duration < 10 ? 'Short Clip' : duration < 30 ? 'Quick Scene' : 'Full-Length Clip';

	return `${keywords.join(' • ')} — ${lengthDesc}`;
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
