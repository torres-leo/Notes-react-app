'use client';

import { useState, useRef, useEffect } from 'react';
import { useNotes } from '@/hooks/useNotes';
import Swal from 'sweetalert2';

const NoteForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const titleRef = useRef<HTMLInputElement>(null);
	const { createNote, updateNote, selectedNote, setSelectedNote } = useNotes();

	useEffect(() => {
		if (selectedNote) {
			setTitle(selectedNote.title);
			setContent(selectedNote.content ?? '');
		}
	}, [selectedNote]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			if (title.trim() === '') {
				return Swal.fire({
					title: 'Error',
					text: 'Yor note must have a title',
					icon: 'error',
					background: '#1f2937',
					color: '#fff',
				});
			}

			if (selectedNote) {
				await updateNote(selectedNote.id, {
					title,
					content,
				});
				setSelectedNote(null);
				return;
			}

			await createNote({ title, content });
		} catch (error) {
			if (error instanceof Error) {
				Swal.fire({
					title: 'Error',
					text: error.message,
					icon: 'error',
					background: '#1f2937',
					color: '#fff',
				});
			}
			console.log(error);
		} finally {
			setTitle('');
			setContent('');
			titleRef.current?.focus();
		}
	};

	const handleCancelButton = () => () => {
		setSelectedNote(null);
		setTitle('');
		setContent('');
	};

	return (
		<form className='w-3/2' onSubmit={handleSubmit}>
			<input
				type='text'
				name='title'
				autoFocus
				placeholder='title'
				className='w-full px-4 py-2 text-black bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				ref={titleRef}
			/>
			<textarea
				name='title'
				placeholder='Write your note here...'
				className='w-full px-4 py-2 text-black resize-none bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2'
				rows={6}
				value={content}
				onChange={(e) => setContent(e.target.value)}></textarea>

			<div className='flex justify-end gap-1'>
				<button
					className='px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-opacity-90 transition-all'
					type='submit'>
					{selectedNote ? 'Update' : 'Create'}
				</button>

				{selectedNote && (
					<button
						className='px-5 py-2 text-white bg-slate-400 rounded-md hover:bg-slate-500 transition-all'
						type='button'
						onClick={handleCancelButton()}>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
};

export default NoteForm;
