'use client';
import { CreateNote, UpdateNote } from '@/interfaces/note';
import { createContext, useState } from 'react';
import { Note } from '@prisma/client';

export const NotesContext = createContext<{
	notes: Note[];
	loadNotes: () => Promise<void>;
	createNote: (note: CreateNote) => Promise<void>;
	updateNote: (id: number, note: UpdateNote) => Promise<void>;
	deleteNote: (id: number) => Promise<void>;
	selectedNote: Note | null;
	setSelectedNote: (note: Note | null) => void;
}>({
	notes: [],
	loadNotes: async () => {},
	createNote: async (note: CreateNote) => {},
	updateNote: async (id: number, note: UpdateNote) => {},
	deleteNote: async (id: number) => {},
	selectedNote: null,
	setSelectedNote: (note: Note | null) => {},
});

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);

	const loadNotes = async () => {
		const res = await fetch('http://localhost:3000/api/notes');
		const data = await res.json();
		setNotes(data);
	};

	const createNote = async (note: CreateNote) => {
		const res = await fetch('http://localhost:3000/api/notes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(note),
		});

		const newNote = await res.json();
		setNotes([...notes, newNote]);
	};

	const deleteNote = async (id: number) => {
		const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
			method: 'DELETE',
		});
		const data = await res.json();
		setNotes(notes.filter((note) => note.id !== id));
	};

	const updateNote = async (id: number, note: UpdateNote) => {
		const res = await fetch(`http://localhost:3000/api/notes/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(note),
		});
		const data = await res.json();
		setNotes(notes.map((note) => (note.id === id ? data.updatedNote : note)));
	};

	return (
		<NotesContext.Provider
			value={{ notes, loadNotes, createNote, updateNote, deleteNote, selectedNote, setSelectedNote }}>
			{children}
		</NotesContext.Provider>
	);
};
