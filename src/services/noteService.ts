
import {Note} from "@/model/Note";
import {NoteRepositoryFactory} from "@/repositories";



export const createNote =  async (title: string, content: string): Promise<Note> => {
    const newNote = new Note(title, content,undefined);

    return await NoteRepositoryFactory.getInstance().getNoteRepository().addNote(newNote);
};

export const getNotes = async (): Promise<Note[]> => {
    return NoteRepositoryFactory.getInstance().getNoteRepository().getNotes();
}

export const saveAllTempNotes =  async (notes: Note[]): Promise<Note[]> => {
    let res = [];
    if(notes.length > 0){
        const tempNotes = notes.filter(note => note.id.isTemporary);
        for (const note of tempNotes) {
            res = [...res, await NoteRepositoryFactory.getInstance().getNoteRepository().addNote(note)]
        }
    }
    console.log("dans le service", res)
    return res;
};

