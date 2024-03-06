
import { INote } from "./types/notes";

export const getAllNotes = async (): Promise<INote[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/notes`, {cache: "no-store"});
    const notes = await res.json();
    return notes;
}

export const addNote = async (note: INote): Promise<INote> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/notes`, {
        cache: "no-store",
        mode: 'no-cors',
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/notes/${note.id}`, {
        cache: "no-store",
        mode: 'no-cors',
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
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_HOST}/notes/${id}`, {
        mode: 'no-cors',
        method: 'DELETE'
    })
}