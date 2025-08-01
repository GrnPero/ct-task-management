import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { useRoute } from "ziggy-js";
import { router } from "@inertiajs/react";
import TaskItem from "./Components/TaskItem";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface Props {
    tasks: Object[];
}

const Index = ({ tasks }: Props) => {
  const route = useRoute();
  const flash = usePage()?.props?.flash?.success;
  const sensors = useSensors(useSensor(PointerSensor));
  const [allTasks, setAllTasks] = React.useState(tasks);
  const [message, setMessage] = React.useState(null);

  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks])

  useEffect(() => {
    if (flash) {
      setMessage(flash);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [flash])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = allTasks.findIndex(task => task.id === active.id);
      const newIndex = allTasks.findIndex(task => task.id === over?.id);

      const newPriority = [...allTasks];
      const [moved] = newPriority.splice(oldIndex, 1);
      newPriority.splice(newIndex, 0, moved);

      setAllTasks(newPriority);

      const newPriorityIndex = newPriority.findIndex(task => task.id === active.id);

      router.post(route('tasks.reorder'), {
        task_id: active.id,
        priority: newPriorityIndex,
      });
    }
  };


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
          {message && (
            <div className="fixed top-4 right-16 z-1">
              <div className="text-green-500 text-lg border border-green-500 bg-green-100 p-4 rounded-lg">
                  {message}
              </div>
            </div>
          )}

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
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                            items={allTasks.map(task => task.id)}
                            strategy={verticalListSortingStrategy}
                        >
                          {allTasks.map((task: any) => (
                            <TaskItem key={task.id} task={task} />
                          ))}
                        </SortableContext>
                      </DndContext>
                </div>
            </div>
        </div>
    );
};

export default Index;
