import {NotesRepository} from "@/repositories/noteRepository";
import {inMemoryNotesRepository} from "@/repositories/inMemoryNotes";
import {payloadApiNotes} from "@/repositories/payloadApiNotes";


export class NoteRepositoryFactory{
    private static instance : NoteRepositoryFactory;
    private _noteRepository: NotesRepository;

    private constructor() {
        const isMocked = process.env.NEXT_PUBLIC_MOCK === 'true';
        this._noteRepository = isMocked ? inMemoryNotesRepository : payloadApiNotes;
    }

    static getInstance(): NoteRepositoryFactory{
        if(!NoteRepositoryFactory.instance){
            NoteRepositoryFactory.instance = new NoteRepositoryFactory();
        }
        return NoteRepositoryFactory.instance;
    }

    setRepository(noteRepository: NotesRepository){
        this._noteRepository = noteRepository;
    }

    getNoteRepository():NotesRepository{
        return this._noteRepository;
    }
}