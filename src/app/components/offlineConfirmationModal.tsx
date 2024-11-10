import React from 'react';

type OfflineConfirmationModalProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const OfflineConfirmationModal: React.FC<OfflineConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Nous rencontrons un problème avec le reseau</h2>
                <p className="text-gray-600 mb-6">Voulez-vous passer en mode hors connexion ?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfflineConfirmationModal;
