"use client"

import { INote } from "@/types/notes";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteNote, editNote } from "@/api";
import { SlMagnifier } from "react-icons/sl";
interface NoteProps {
    note: INote
}

const Note: React.FC<NoteProps> = ({note}) => {
    const router = useRouter();
    const [modalOpenEdit, setModalOpenlEdit] = useState<boolean>(false);
    const [modalOpenDeleted, setModalOpenDeleted] = useState<boolean>(false);
    const [modalOpenFullInfo, setModalOpenFullInfo] = useState<boolean>(false);
    const [editNoteAutorValue, setEditNoteAutorValue] = useState<string> (note.autor);
    const [editNoteTextValue, setEditNoteTextValue] = useState<string> (note.text);
    const [editNotePriorityValue, setEditNotePriorityValue] = useState<string> (note.priority);

    const handleSubmitEditNote: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await editNote({
            id: note.id,
            autor: editNoteAutorValue,
            text: editNoteTextValue,
            priority: editNotePriorityValue,
            addDate: new Date().toLocaleDateString(),
              })
        setModalOpenlEdit(false);
        router.refresh();
    }

    const handleDeleteNote = async (id: string) => {
        await deleteNote(id);
        setModalOpenDeleted(false);
        router.refresh();
    }


    return (
        <tr key={note.id}>
            <td>{note.autor}</td>
            <td>{note.text}</td>
            <td className="flex gap-5">
                <SlMagnifier onClick={() => setModalOpenFullInfo(true)} cursor="pointer" className="text-yellow-500" size={20} />
                <Modal modalOpen={modalOpenFullInfo} setModalOpen={setModalOpenFullInfo}>
                    <h3 className="font-bold text-lg text-center">Полная информация о заметке</h3>
                    <div className="modal-action flex gap-5">
                    <div className='modal-action'>
                        <table className="table">
                            {/* head */}
                            <thead>
                            <tr className='font-bold text-lg'>
                                <th>Автор</th>
                                <th>Текст заметки</th>
                                <th>Приоритет</th>
                                <th>Дата создания</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{note.autor}</td>
                                    <td>{note.text}</td>
                                    <td>{note.priority}</td>
                                    <td>{note.addDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </Modal>
                <FiEdit onClick={() => setModalOpenlEdit(true)} cursor="pointer" className="text-blue-500" size={20}/>
                <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenlEdit}>
                <form onSubmit={handleSubmitEditNote}>
                    <h3 className='font-bold text-lg'>Редактирование заметки</h3>
                    <div className='modal-action'>
                        <input 
                            value={editNoteAutorValue}
                            placeholder={note.autor} 
                            onChange={(e) => setEditNoteAutorValue (e.target.value)}
                            type="text" 
                            className="input input-bordered w-full">
                        </input>
                        <input
                            value={editNoteTextValue}
                            placeholder={note.text}
                            onChange={(e) => setEditNoteTextValue (e.target.value)}
                            type="text" 
                            className="input input-bordered w-full">
                        </input>
                        <input
                            value={editNotePriorityValue}
                            placeholder={note.priority}
                            onChange={(e) => setEditNotePriorityValue (e.target.value)}
                            type="text" 
                            className="input input-bordered w-full">
                        </input>
                    </div>
                    <button type='submit' className='btn m-5'>Добавить</button>
                </form>
            </Modal>
                <FiTrash2 onClick={() => setModalOpenDeleted(true)}  cursor="pointer" className="text-red-500" size={20}/>
                <Modal modalOpen={modalOpenDeleted} setModalOpen={setModalOpenDeleted}>
                    <h3 className="text-lg text-center">Вы уверены?</h3>
                    <div className="modal-action flex gap-5">
                        <button
                            onClick={()=>handleDeleteNote(note.id)}
                            className="btn  text-center"
                        >
                            Да
                        </button>
                        
                        <button
                            onClick={()=>setModalOpenDeleted(false)}
                            className="btn  text-center"
                        >
                            Нет
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    );
 };
export default Note;

