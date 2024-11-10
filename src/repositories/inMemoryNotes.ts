
import {NotesRepository} from "@/repositories/noteRepository";
import {Note} from "@/model/Note";
import {NoteId} from "@/model/NoteId";
const note = new Note('Faire les courses',
    "Prendre de la soupe",
    NoteId.createPermanent("1")
);

const notes: Note[] = [note];

export const inMemoryNotesRepository: NotesRepository = {
    getNotes: async () => [...notes],

    addNote: async (note: Note) => {
        const savedNote = new Note(note.title, note.content, note.id);
        notes.push(savedNote);
        return savedNote;
    },
};