import {Note} from "@/model/Note";


export interface NotesRepository {
    getNotes: () => Promise<Note[]>;
    addNote: (note: Note) => Promise<Note>;
}