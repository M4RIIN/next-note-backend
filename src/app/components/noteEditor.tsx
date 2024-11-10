'use client';

import React, {useEffect, useState} from "react";
import {useNotesStore} from "@/app/stores/useNoteStore";
import Toast from "@/app/components/toast";
import {Note} from "@/model/Note";
import OfflineConfirmationModal from "@/app/components/offlineConfirmationModal";
import {NoteRepositoryFactory} from "@/repositories";
import {inMemoryNotesRepository} from "@/repositories/inMemoryNotes";
import {payloadApiNotes} from "@/repositories/payloadApiNotes";

type NoteEditorProps = {
    note: Note | null;
};

export const NoteEditor: React.FC<NoteEditorProps> = ({note}) => {
    const [title, setTitle] = useState(note?.title || '');
    const [content, setContent] = useState(note?.content || '');
    const [statut, setStatut] = useState(note?.id.isTemporary ? 'Note non sauvegardée': 'Note à jour');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSync, setShowSync] = useState<boolean>(false);

    const showToast = (message: string, type: 'success' | 'error' | 'info') => {
        setToast({ message, type });
    };

    const closeToast = () => {
        setToast(null);
    };


    const { addNote,setOffline,handleSync, isOffline, notes } = useNotesStore();

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
        setStatut('Note non sauvegardée')
    };

    const handleChangeContent = (event) => {
        setContent(event.target.value);
        setStatut('Note non sauvegardée')
    };

    const handleConfirm = () => {
        setIsModalOpen(false);
        console.log("Passage en mode hors connexion");
        NoteRepositoryFactory.getInstance().setRepository(inMemoryNotesRepository);
        setOffline(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        try{
          const addedNote = await addNote(title, content);
          setStatut(addedNote.id.isTemporary ? 'Note non sauvegardée': 'Note à jour');
        }catch (e){
            console.log(e)
            if(e.message == 'Failed to fetch'){
                setIsModalOpen(true)
            }
            showToast(e.message,"error");
        }
    }

    const handleSynchro = async () => {
        try{
            NoteRepositoryFactory.getInstance().setRepository(payloadApiNotes);
            await handleSync();
            setOffline(false);
        }catch (e){
            console.log(e)
            if(e.message == 'Failed to fetch'){
                setIsModalOpen(true)
            }
            showToast(e.message,"error");
        }

    }

    useEffect(() => {
        setTitle(note?.title || '');
        setContent(note?.content || '');
        setStatut(note?.id.isTemporary ? 'Note non sauvegardée': 'Note à jour');
    }, [note]);

    useEffect(() => {
        setShowSync(isOffline);
        // console.log(showSync)
    }, [isOffline]);

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-lg h-screen overflow-y-scroll">
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Éditeur de Note</h2>

                <p>{statut}</p>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                    Titre
                    <input
                        type="text"
                        value={title}
                        onChange={handleChangeTitle}
                        placeholder="Titre"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </label>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                    Contenu
                    <textarea
                        value={content}
                        onChange={handleChangeContent}
                        placeholder="Tapez ici..."
                        rows="10"
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    />
                </label>
            </div>
            <button
                onClick={handleSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out"
            >
                Sauvegarder la note
            </button>
            {toast && <Toast message={toast.message} type={toast.type} onClose={closeToast} />}
            <OfflineConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

            {showSync ? <div className="fixed bottom-4 right-4">
                <button
                    onClick={handleSynchro}
                    className="flex items-center gap-2 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out">
                    <svg className="w-5 h-5 animate-spin mr-2" fill="none" stroke="currentColor" strokeWidth="2"
                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M4 4v5h.582m15.178-3A9.953 9.953 0 0112 2a9.953 9.953 0 00-8.364 4M20 20v-5h-.582m-15.178 3A9.953 9.953 0 0012 22a9.953 9.953 0 008.364-4"/>
                    </svg>
                    Synchroniser en ligne
                </button>
            </div>: null}
        </div>
    );
};
