import { getData } from "@/firebase/config";
import { formatTimeAgo } from "@/utils/utils";
import { Timestamp } from "firebase/firestore";
import Link from "next/link";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

export interface INote {
  id: string;
  title: string;
  content: string;
  created: Timestamp;
  color: string;
}

async function getNotes() {
  const notes = await getData<INote>("notes");
  return notes;
}

export default async function Home() {
  const notes = await getNotes();
  return (
    <>
      <div className='grid-container'>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </>
  );
}

function Note({ note }: { note: INote }) {
  const created = note.created.toDate().toDateString();
  const createdAt = formatTimeAgo(new Date(created));

  return (
    <Link href={`/note/${note.id}`}>
      <div
        style={{
          backgroundColor: note.color,
        }}
        className='card'
      >
        <h2 className='font-bold text-2xl'>{note.title}</h2>
        <p className='font-medium'>{createdAt}</p>
        <p>{note.content}</p>
      </div>
    </Link>
  );
}
