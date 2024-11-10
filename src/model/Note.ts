import {ContentLenghtError, NoteErrors} from "@/model/errors/NoteErrors";
import {NoteId} from "@/model/NoteId";

export class Note {
    id: NoteId;
    title: string;
    content: string;

    constructor(title: string, content: string ,id?: NoteId ) {
        if(title == undefined || title.length < 2){
            throw new NoteErrors();
        }
        if (content == undefined || content.length < 1){
            throw new ContentLenghtError();
        }
        this.id = id ?? NoteId.createTemporary();
        this.title = title;
        this.content = content;
    }


    static emptyNote() : Note{
        return new Note("Titre","Contenu",NoteId.createTemporary());
    }


}
