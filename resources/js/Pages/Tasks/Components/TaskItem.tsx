import { useSortable } from "@dnd-kit/sortable";
import { router } from "@inertiajs/react";
import React, { useState } from "react";
import { useRoute } from "ziggy-js";
import { CSS } from "@dnd-kit/utilities";
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



interface Props {
    task: Object;
}

const TaskItem = ({ task }: Props) => {
    const route = useRoute();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
    };


    const [name, setName] = useState(task.name);

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route("tasks.update", task.id), {
            name: name,
        });
    };

    const handleDelete = (e, id) => {
        e.preventDefault();
        router.delete(route("tasks.destroy", id));
    };

    return (
        <div className="flex flex-row gap-4 mb-4 justify-between w-full border border-gray-400 p-4 shadow-md rounded-lg hover:cursor-grab"
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <div
                {...listeners}
                className="self-center hover:cursor-grab active:cursor-grabbing p-1"
            >
                <FontAwesomeIcon icon={faGripVertical} className="cursor-grab" />
            </div>

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
