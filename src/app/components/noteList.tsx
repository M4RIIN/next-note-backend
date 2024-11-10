'use client';

import React, { useEffect } from 'react';
import {useNotesStore} from "@/app/stores/useNoteStore";
import {Note} from "@/model/Note";

type NotesListProps = {
    onSelectNote: (note: Note) => void;
    onAddNote: () => void;
};

const NotesList: React.FC<NotesListProps> = ({onSelectNote, onAddNote}) => {
    const { notes, fetchNotes } = useNotesStore();

    const handleAddNote = async () => {
        onAddNote();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("hmm");
                await fetchNotes();
            } catch (e) {
                console.log("aie", e);
            }
        };

        fetchData();

    }, [fetchNotes]);


    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg h-screen  overflow-y-scroll">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Liste des Notes</h2>
            <button
                onClick={handleAddNote}
                className="w-full mb-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
                Ajouter une note
            </button>
            <ul className="space-y-3">
                {notes.map((note) => (
                    <li
                        onClick={() => onSelectNote(note)}
                        key={note.id.value}
                        className="cursor-pointer flex items-center p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out"
                    >
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{note.title}</h3>
                            <p className="text-gray-600">{note.content}</p>
                        </div>
                        <div className="ml-4">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    !note.id.isTemporary ? 'bg-green-500' : 'bg-red-500'
                                }`}
                                title={!note.id.isTemporary ? "Synchronisé" : "Non synchronisé"}
                            ></div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;
