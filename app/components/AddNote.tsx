"use client"
import { MdOutlineLibraryAdd } from 'react-icons/md'
import ModalAddNote from './Modal';
import { FormEventHandler, useState } from 'react';
import { addNote } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';


const AddNote = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newNoteAutorValue, setNewNoteAutorValue] = useState<string> ('');
    const [newNoteTextValue, setNewNoteTextValue] = useState<string> ('');
    const [newNotePriorityValue, setNewNotePriorityValue] = useState<string> ('');

    
    const handleSubmitNewNote: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await addNote({
            id: uuidv4(),
            autor: newNoteAutorValue,
            text: newNoteTextValue,
            priority: newNotePriorityValue,
            addDate: new Date().toLocaleDateString()
              })

        setNewNoteAutorValue('');
        setNewNoteTextValue('');
        setNewNotePriorityValue('');
        setModalOpen(false);
        router.refresh();
    }

    return (
        <div>
            <button
                onClick={() => setModalOpen(true)}
                className='btn m-5'
                >    
                Добавить заметку<MdOutlineLibraryAdd size={20}/>
            </button>
            <ModalAddNote modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form onSubmit={handleSubmitNewNote}>
                    <h3 className='font-bold text-lg'>Добавить новую заметку</h3>
                    <div className='modal-action'>
                        <input
                            value={newNoteAutorValue}
                            onChange={(e) => setNewNoteAutorValue (e.target.value)}
                            type="text" 
                            placeholder="Автор" 
                            className="input input-bordered w-full">
                        </input>
                        <input
                            value={newNoteTextValue}
                            onChange={(e) => setNewNoteTextValue (e.target.value)}
                            type="text" 
                            placeholder="Текст заметки" 
                            className="input input-bordered w-full">
                        </input>
                        <input
                            value={newNotePriorityValue}
                            onChange={(e) => setNewNotePriorityValue (e.target.value)}
                            type="text" 
                            placeholder="Приоритет"
                            className="input input-bordered w-full">
                        </input>
                    </div>
                    <button type='submit' className='btn m-5'>Добавить</button>
                </form>
            </ModalAddNote>
        </div>
    );
 };
export default AddNote;