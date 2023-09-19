import { Note } from '@prisma/client';
import { useNotes } from '@/hooks/useNotes';
import Swal from 'sweetalert2';

const NoteCard = ({ note }: { note: Note }) => {
	const { deleteNote, setSelectedNote } = useNotes();

	const handleDelete = (note: Note) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			background: '#1f2937',
			color: '#fff',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#34d33c',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then(async (result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: 'Deleted!',
					text: 'Your Note has been deleted.',
					background: '#1f2937',
					color: '#fff',
					icon: 'success',
					confirmButtonColor: '#34d33c',
				});
				await deleteNote(Number(note.id));
			}
		});
	};

	const handleEditNote = (note: Note) => {
		setSelectedNote(note);
	};

	return (
		<article className='bg-white/20 rounded-lg w-80 p-2 overflow-y-auto h-44 max-md:w-full relative'>
			<header className='flex items-center justify-between gap-2 mb-3'>
				<h1 className='font-semibold tracking-wide'>{note.title}</h1>
				<div className='flex items-center justify-center gap-1'>
					<button
						className='text-sm px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-all'
						onClick={() => handleEditNote(note)}>
						Edit
					</button>
					<button
						className='text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-all'
						onClick={() => handleDelete(note)}>
						Delete
					</button>
				</div>
			</header>
			<p className='text-sm tracking-wide'>{note.content}</p>
			<footer className='text-xs absolute bottom-2 right-2'>{new Date(note.createdAt).toLocaleDateString()}</footer>
		</article>
	);
};

export default NoteCard;
