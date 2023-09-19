import { NotesContext } from '@/context/notes-provider';
import { useContext } from 'react';

export const useNotes = () => {
	return useContext(NotesContext);
};
