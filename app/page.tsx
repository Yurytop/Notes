import { getAllNotes } from "@/api";
import AddTask from "./components/AddNote";
import NoteList from "./components/NoteList";
import AddNote from "./components/AddNote";
export default async function Home() {
  const notes = await getAllNotes();

  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-center textarea-md font-bold text-2xl">Список заметок</h1>
        <NoteList notes = {notes}/>
      </div>
    </main>
  );
}
