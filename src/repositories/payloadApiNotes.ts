
import {NotesRepository} from "@/repositories/noteRepository";
import {Note} from "@/model/Note";
import {NoteId} from "@/model/NoteId";




export const payloadApiNotes: NotesRepository = {
    getNotes: async () => {
        const response = await fetch('http://localhost:3001/api/notes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonResponse = await response.json()
        return jsonResponse.docs.map( elt => {return mapNote(elt)});
    },

    addNote: async (note: Note) => {
        const response = await fetch('http://localhost:3001/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: note.title,
                content: note.content,
            })
        });
        const noteJson = await response.json();
        return mapNote(noteJson.doc);
    }

};

function mapNote(noteJson) {
    return new Note(noteJson.title, noteJson.content, new NoteId(noteJson.id, false));
}

// export const noteRepositoryFactory = NoteRepositoryFactory.getInstance();