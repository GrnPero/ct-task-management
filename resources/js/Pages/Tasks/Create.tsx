import { useForm } from '@inertiajs/react';
import React from 'react'
import { useRoute } from 'ziggy-js';

interface Props {
  tasks: Object[];
}

const Create = ({tasks}: Props) => {
  const route = useRoute();

  const { data, setData, post, delete: destroy } = useForm({
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.store'), {
      onSuccess: () => {
        setData({ name: '' });
      },
    });
  }

  const handleDelete = (id) => {
    destroy(route('tasks.delete', id));
  };

  return (
    <div className="max-w-[1280px] mx-auto my-0">
      <div className='flex justify-center items-center h-screen'>
        <div className="rounded-lg border border-gray-300 p-4 shadow-md flex flex-col items-center">
          <h1 className="text-lg font-bold mb-4">Task Management</h1>
          <form className="flex flex-row gap-4 mb-4" onSubmit={handleSubmit}>
            <p className='self-center text-lg'>Name</p>
            <input
              className='border border-gray-300 rounded-lg p-2'
              type='text'
              onChange={(e) => setData('name', e.target.value)}
              value={data.name}
            />
            <button className='text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 hover:cursor-pointer'>
              Create
            </button>
          </form>

          {tasks.map((task: any) => (
            <div key={task.id} className='flex flex-row gap-4 mb-4 justify-between w-full border border-gray-400 p-4 shadow-md rounded-lg'>
              <p className='text-lg'>Priority: {task.priority}</p>
              <p className='text-lg'>Name: {task.name}</p>
              <button className='text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 hover:cursor-pointer' onClick={() => {
                  handleDelete(task.id);
                }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Create;