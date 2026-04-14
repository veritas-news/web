const dateFormatter = new Intl.DateTimeFormat('en', {
	dateStyle: 'medium'
});

const dateTimeFormatter = new Intl.DateTimeFormat('en', {
	dateStyle: 'medium',
	timeStyle: 'short'
});

const compactNumberFormatter = new Intl.NumberFormat('en', {
	notation: 'compact',
	maximumFractionDigits: 1
});

export function formatDate(value: string | null | undefined): string {
	if (!value) return 'Unknown';

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return 'Unknown';

	return dateFormatter.format(date);
}

export function formatDateTime(value: string | null | undefined): string {
	if (!value) return 'Unknown';

	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return 'Unknown';

	return dateTimeFormatter.format(date);
}

export function formatDateRange(
	start: string | null | undefined,
	end: string | null | undefined
): string {
	if (!start && !end) return 'Unknown';
	if (!start) return formatDate(end);
	if (!end) return formatDate(start);

	return `${formatDate(start)} - ${formatDate(end)}`;
}

export function formatCompactNumber(value: number | null | undefined): string {
	if (value == null) return '0';
	return compactNumberFormatter.format(value);
}
