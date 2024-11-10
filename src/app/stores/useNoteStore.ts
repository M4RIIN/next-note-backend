// stores/useNotesStore.ts

import {create} from 'zustand';
import {createNote, getNotes, saveAllTempNotes} from "@/services/noteService";
import {Note} from "@/model/Note";

interface NotesState {
    notes: Note[];
    fetchNotes: () => Promise<void>;
    addNote: (title: string, content: string) => Promise<Note>;
    isOffline: boolean;
    setOffline: (statut: boolean) => void;
    handleSync: () => Promise<void>;
}

export const useNotesStore = create<NotesState>((set,get) => ({
    notes: [],
    fetchNotes: async () =>{
        console.log("on fect")
        const notes = await getNotes();
        set({notes})
    },
    addNote: async (title: string, content: string) => {
        const newNote = await createNote(title, content);
        set((state) => ({ notes: [...state.notes, newNote] }));
        return newNote;
    },
    isOffline: false,
    setOffline: (statut: boolean) => {
        set({isOffline: statut});
        console.log("store", statut)
    },
    handleSync: async () => {
        console.log()
        const savedNotes = await saveAllTempNotes(get().notes);
        const allNews = get().notes.filter((note : Note) => !note.id.isTemporary).concat(...savedNotes);
        set({notes : allNews});
    }
}));
