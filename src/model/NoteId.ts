export class NoteId {
    private readonly _value: string;
    private readonly _isTemporary: boolean;

    private constructor(value: string, isTemporary: boolean) {
        this._value = value;
        this._isTemporary = isTemporary;
    }

    static createTemporary(): NoteId {
        return new NoteId(this.generateUuid(), true);
    }

    static createPermanent(value: string): NoteId {
        return new NoteId(value, false);
    }

    get value(): string {
        return this._value;
    }

    get isTemporary(): boolean {
        return this._isTemporary;
    }

    toPermanent(value: string): NoteId {
        if (!this._isTemporary) {
            throw new Error("Cannot convert a permanent NoteId to another permanent NoteId.");
        }
        return NoteId.createPermanent(value);
    }

    private static generateUuid(): string {
        // Génération d'un UUID pour l'identifiant temporaire
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
