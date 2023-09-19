'use client';
import { useEffect } from 'react';
import NoteForm from '@/components/note-form';
import { useNotes } from '@/hooks/useNotes';
import NoteCard from '@/components/note-card';

function Page() {
	const { notes, loadNotes } = useNotes();

	useEffect(() => {
		loadNotes();
	}, []);

	const renderNotes = () => {
		return notes.map((note) => <NoteCard key={note.id} note={note} />);
	};

	return (
		<div className='text-gray-800 dark:text-gray-300  flex items-center justify-center min-h-screen flex-col'>
			<div className='max-sm:px-6'>
				<NoteForm />
			</div>
			{/* <div className='flex items-center justify-start flex-wrap w-[985px] max-w-full mt-6 gap-3 max-lg:justify-center max-md:h-1/2 max-md:overflow-y-scroll px-10'> */}
			<div className='grid lg:grid-cols-4 gap-3 mt-6 grid-cols-2 max-sm:grid-cols-1 px-6'>{renderNotes()}</div>
		</div>
	);
}

export default Page;
