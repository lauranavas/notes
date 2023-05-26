"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { saveData } from "@/firebase/config";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(3),
  content: z.string(),
  color: z.string(),
});

export default function CreateNote() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      color: "#FFFFA0",
    },
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function onSubmit(data: any) {
    await saveData("notes", {
      ...data,
      created: Timestamp.fromDate(new Date()),
    });
    router.push("/");
  }

  return (
    <div>
      <h1 className="font-bold text-4xl">Create a new note</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-item'>
          <label htmlFor='title' className='form-label'>
            Title
          </label>
          <div className='form-control'>
            <input type='text' {...register("title")} id='title' className="py-2" />
            {errors.title?.message && <p>{errors.title?.message}</p>}
          </div>
        </div>
        <div className='form-item'>
          <label htmlFor='content' className='form-label'>
            Content
          </label>
          <div className='form-control'>
            <textarea rows={2} {...register("content")} id='content' className="py-2" />
            {errors.content?.message && <p>{errors.content?.message}</p>}
          </div>
        </div>
        <div className='form-item'>
          <label htmlFor='color' className='form-label'>
            Color
          </label>
          <div className='form-control'>
            <input type='color' {...register("color")} id='color' />
            {errors.color?.message && <p>{errors.color?.message}</p>}
          </div>
        </div>
        <button
          className='w-full mt-3 mb-3 py-3 rounded-2xl text-center bg-black text-white font-bold text-xl hover:bg-gray-700'
          type='submit'
          disabled={isSubmitting}
        >
          Add new note
        </button>
      </form>
    </div>
  );
}
