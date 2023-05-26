import { getDocDataById } from "@/firebase/config";
import { formatTimeAgo } from "@/utils/utils";
import Link from "next/link";
import { FiArrowLeftCircle } from "react-icons/fi";

import { INote } from "../../page";

async function getNote(noteId: string) {
  const note = await getDocDataById<INote>("notes", noteId);

  return note;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);
  const created = note?.created.toDate().toDateString();
  const createdAt = formatTimeAgo(new Date(created || ""));
  return (
    <div>
      <Link href='/' className='inline-flex items-center mb-3 self-start text-lg hover:font-bold mb-3'>
        <FiArrowLeftCircle className='mr-1' />
        Go back
      </Link>
      <h2 className='text-3xl font-bold'>Title</h2>
      <p className='text-xl mb-3'>{note?.title}</p>
      <h2 className='text-3xl font-bold'>Created at</h2>
      <p className='text-xl mb-3 text-gray-800'>{createdAt}</p>
      <h2 className='text-3xl font-bold'>Content</h2>
      <p className='text-xl'>{note?.content}</p>
    </div>
  );
}
