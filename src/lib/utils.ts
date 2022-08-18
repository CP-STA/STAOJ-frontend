import type { Timestamp } from 'firebase/firestore';

export function formatDate(date: Date): String {
	return Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
}

export function formateFirebaseDate(date: Timestamp | null): String {
	if (date) {
		return formatDate(date.toDate());
	} else {
		return 'Waiting for Server';
	}
}
