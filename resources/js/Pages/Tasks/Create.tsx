import { useForm } from "@inertiajs/react";
import React from "react";
import { useRoute } from "ziggy-js";
import { router } from "@inertiajs/react";
import TaskItem from "./Components/TaskItem";

interface Props {
    tasks: Object[];
}

const Create = ({ tasks }: Props) => {
    const route = useRoute();

    const { data, setData, post } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tasks.store"), {
            onSuccess: () => {
                setData({ name: "" });
            },
        });
    };

    return (
        <div className="max-w-[1280px] mx-auto my-0">
            <div className="flex justify-center items-center my-5">
                <div className="rounded-lg border border-gray-300 p-4 shadow-md flex flex-col items-center">
                    <h1 className="text-lg font-bold mb-4">Task Management</h1>
                    <form
                        className="flex flex-row gap-4 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <p className="self-center text-lg">Name</p>
                        <input
                            className="border border-gray-300 rounded-lg p-2"
                            type="text"
                            onChange={(e) => setData("name", e.target.value)}
                            value={data.name}
                        />
                        <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 hover:cursor-pointer">
                            Create
                        </button>
                    </form>

                    {tasks.map((task: any) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Create;
