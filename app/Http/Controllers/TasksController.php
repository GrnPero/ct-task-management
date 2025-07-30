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
        //       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tasks = Task::query()->orderBy('priority', 'asc')->get();

        return Inertia::render('Tasks/Create', [
            'tasks' => $tasks,
        ]);
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

        return redirect()->route('tasks.create');
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::find($id);

        $task->delete();

        $this->reorderPriority();

        return redirect()->route('tasks.create');
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
        
        return redirect()->route('tasks.create');
    }
}
