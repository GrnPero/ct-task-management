<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::query()->orderBy('priority', 'asc')->get();

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $total = Task::query()->count();

        Task::create([
            'name' => $validate['name'],
            'priority' => $total + 1,
        ]);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $task = Task::query()->find($id);

        $task->name = $validate['name'];

        $task->save();
        
        return redirect()->route('tasks.index')->with('success', 'Task updated successfully!');;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);

        $task->delete();

        $this->reorderPriority();

        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully!');;
    }

    /**
     * When user drags the tasks and drops them, we need to reorder the priority
     */
    public function reorder(Request $request)
    {
        $validate = $request->validate([
            'task_id' => 'required|integer',
            'priority' => 'required|integer',
        ]);

        $task = Task::query()->find($validate['task_id']);

        $tasks = Task::query()
            ->whereNot('id', $validate['task_id'])
            ->orderBy('priority')
            ->get(['id'])
            ->toArray();

        array_splice($tasks, $validate['priority'], 0, [['id' => $task->id]]);

        foreach ($tasks as $index => $t) {
            Task::where('id', $t['id'])->update(['priority' => $index + 1]);
        }

        return redirect()->route('tasks.index')->with('success', 'Task reordered successfully!');;
    }

    /**
     * Reorder the priority
     */
    private function reorderPriority()
    {
        $tasks = Task::query()->orderBy('priority', 'asc')->get();

        foreach ($tasks as $index => $task) {
            $task->priority = $index + 1;
            $task->save();
        }
        
        return redirect()->route('tasks.index');
    }
}
