'use client';

import React, {useEffect, useState} from 'react';
import NotesList from "@/app/components/noteList";
import {NoteEditor} from "@/app/components/noteEditor";
import './style.css';
import {Note} from "@/model/Note";
import {useNotesStore} from "@/app/stores/useNoteStore";


const HomePage: React.FC = () => {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {notes} = useNotesStore()


    const handleSelectNote = (note: Note) => {
        setSelectedNote(note);
        setIsOpen(true);
    };

    const handleAddNote = () => {
        setSelectedNote(Note.emptyNote())
        setIsOpen(true);
    };

    useEffect(() => {
        setIsOpen(false)
    }, [notes]);




    return (
        <div className="side-by-side">
            <div className="flex-1">
                <NotesList onSelectNote={handleSelectNote} onAddNote={handleAddNote}/>
            </div>
            <div className="flex-[2]">
                {isOpen ? <NoteEditor note={selectedNote}/> : null}
            </div>

        </div>
    );
};

export default HomePage;
