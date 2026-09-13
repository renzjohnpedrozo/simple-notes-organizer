import {
	onValue,
	push,
	ref,
	remove,
	set,
	update
} from 'firebase/database';

import { database } from './firebase';

export interface NoteRecord {
	id?: string;
	title: string;
	content: string;
	category: string;
	dateCreated: string;
	status: string;
}

const notesReference = ref(database, 'notes');

export const subscribeToNotes = (
	callback: (notes: NoteRecord[]) => void
) => onValue(notesReference, snapshot => {
	const data = snapshot.val() as Record<
		string,
		Omit<NoteRecord, 'id'>
	> | null;

	const notes = Object.entries(data ?? {}).map(([id, note]) => ({
		id,
		...note
	}));

	callback(notes);
});

export const createNote = async (
	note: Omit<NoteRecord, 'id'>
) => {
	const newNoteReference = push(notesReference);

	await set(newNoteReference, note);
};

export const updateNote = async (
	id: string,
	note: Omit<NoteRecord, 'id'>
) => {
	await update(ref(database, `notes/${id}`), note);
};

export const deleteNote = async (id: string) => {
	await remove(ref(database, `notes/${id}`));
};
