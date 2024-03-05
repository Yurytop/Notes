import { INote } from "./types/notes";

const baseUrl = 'http://127.0.0.1:3002';

export const getAllNotes = async (): Promise<INote[]> => {
    const res = await fetch (`${baseUrl}/notes`, {cache: "no-store"});
    const notes = await res.json();
    return notes;
}

export const addNote = async (note: INote): Promise<INote> => {
    const res = await fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    const newNote = await res.json();
    return newNote;
}

export const editNote = async (note: INote): Promise<INote> => {
    const res = await fetch(`${baseUrl}/notes/${note.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    const updatedNote = await res.json();
    return updatedNote;
}

export const deleteNote = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/notes/${id}`, {
        method: 'DELETE'
    })
}