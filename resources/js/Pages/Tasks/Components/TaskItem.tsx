import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useRoute } from "ziggy-js";

interface Props {
    task: Object;
}

const TaskItem = ({ task }: Props) => {
    const route = useRoute();

    const [name, setName] = useState(task.name);

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route("tasks.update", task.id), {
            name: name,
        });
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        router.delete(route("tasks.delete", id));
    };

    return (
        <div className="flex flex-row gap-4 mb-4 justify-between w-full border border-gray-400 p-4 shadow-md rounded-lg">
            <p className="text-lg self-center">Priority: {task.priority}</p>
            <input
                className="border border-gray-300 rounded-lg p-2"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <button
                className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 hover:cursor-pointer"
                onClick={(e) => {
                    handleUpdate(e);
                }}
            >
                Update
            </button>
            <button
                className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 hover:cursor-pointer"
                onClick={(e) => {
                    handleDelete(e, task.id);
                }}
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
