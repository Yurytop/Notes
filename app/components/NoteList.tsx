"use client"

import { INote } from '@/types/notes';
import Note from './Note';
import { useEffect, useState } from 'react';
import AddNote from "./AddNote";


interface NoteListProps {
    notes : INote[]
}

const filterAutor = (searchText: string, listOfAutors: INote[]): INote[]  => {
     if (!searchText) {
        return listOfAutors;
     }
        return listOfAutors.filter(({ autor }) =>
            autor.toLowerCase().includes(searchText.toLowerCase())
     );
}

const NoteList: React.FC<NoteListProps> = ({notes}) => {
    const[autorList, setAutorList] = useState(notes)
    const[searchValue, setSearchValue] = useState('')
    
    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredAutors = filterAutor(searchValue, notes);
            setAutorList(filteredAutors);
        }, 300);

        return () => clearTimeout(Debounce);

    }, [searchValue, notes])

    return (
        <div>
            <div className="flex flex-wrap">
            <input
                className="input input-bordered w-full max-w-xs m-5"
                value={searchValue}
                autoFocus
                type='text'
                autoComplete='off'
                placeholder='Фильтр по автору'
                onChange={(e) => setSearchValue (e.target.value)}
                />
            <AddNote/>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                <tr className='font-bold text-lg'>
                    <th>Автор</th>
                    <th>Текст заметки</th>
                </tr>
                </thead>
                <tbody>
                    {autorList.map((note) => (
                        <Note key={note.id} note={note}/> 
                    ))}
                </tbody>
            </table>
        </div>
    );
 };
export default NoteList;