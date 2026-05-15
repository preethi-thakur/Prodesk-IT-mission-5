import React, { useEffect, useState } from 'react'

import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'


import './Style.css'

export default function App() {

  const [tasks, setTasks] = useState(() => {

    const savedTasks = localStorage.getItem("tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
      : []

  })

  const [search, setSearch] = useState("")

  // Inline Editing States
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editedText, setEditedText] = useState("")

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )

  }, [tasks])

  const addTask = (task) => {

    setTasks([...tasks, task])

  }

  const moveTask = (id, newStatus) => {

    const updatedTasks = tasks.map(task =>

      task.id === id
        ? { ...task, status: newStatus }
        : task

    )

    setTasks(updatedTasks)

  }

  const deleteTask = (id) => {

    setTasks(
      tasks.filter(task => task.id !== id)
    )

  }

  // Start Editing
  const handleEdit = (task) => {

    setEditingTaskId(task.id)
    setEditedText(task.text)

  }

  // Save Edited Task
  const handleSave = (id) => {

    const updatedTasks = tasks.map(task =>

      task.id === id
        ? { ...task, text: editedText }
        : task

    )

    setTasks(updatedTasks)

    setEditingTaskId(null)
    setEditedText("")

  }

  const clearTasks = () => {

    setTasks([])

  }

  return (

    <div className="p-6 bg-gray-300 min-h-screen">

      <header className="mb-8 text-center">

        <h1 className="text-5xl font-bold text-blue-600">
          TaskBuddy
        </h1>

        <p className="text-gray-600 mt-2">
          Your Friendly Kanban Board
        </p>

      </header>

      <TaskForm addTask={addTask} />

      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            min-w-80
            p-3
            rounded-xl
            border
            border-gray-500
            mb-5
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-600
            flex
            justify-center
            ml-120
          "
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-8">

        {["todo", "progress", "done"].map((status, index) => {

          const titles = ["To Do", "In Progress", "Done"]

          return (

            <div
              key={status}
              className="bg-white p-4 rounded-xl shadow"
            >

              <h2 className="text-2xl font-bold mb-4">
                {titles[index]}
              </h2>

              {tasks
                .filter(
                  task =>
                    task.status === status &&
                    task.text
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map(task => (

                  <div
                    key={task.id}
                    className="
                      bg-gray-100
                      p-3
                      rounded-lg
                      mb-3
                      shadow-sm
                    "
                  >

                    {/* Inline Editing */}
                    {editingTaskId === task.id ? (

                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) =>
                          setEditedText(e.target.value)
                        }
                        onBlur={() => handleSave(task.id)}
                        onKeyDown={(e) => {

                          if (e.key === "Enter") {

                            handleSave(task.id)

                          }

                        }}
                        autoFocus
                        className="
                          w-full
                          p-2
                          border
                          rounded
                          mb-2
                        "
                      />

                    ) : (

                      <p
                        onClick={() => handleEdit(task)}
                        className="cursor-pointer font-medium"
                      >
                        {task.text}
                      </p>

                    )}

                    <div className="flex gap-2 mt-3">

                      {status !== "todo" && (
                        <button
                          onClick={() =>
                            moveTask(task.id, "todo")
                          }
                          className="
                            bg-blue-500
                            text-white
                            px-3
                            py-1
                            rounded
                          "
                        >
                          To Do
                        </button>
                      )}

                      {status !== "progress" && (
                        <button
                          onClick={() =>
                            moveTask(task.id, "progress")
                          }
                          className="
                            bg-yellow-500
                            text-white
                            px-3
                            py-1
                            rounded
                          "
                        >
                          Progress
                        </button>
                      )}

                      {status !== "done" && (
                        <button
                          onClick={() =>
                            moveTask(task.id, "done")
                          }
                          className="
                            bg-green-500
                            text-white
                            px-3
                            py-1
                            rounded
                          "
                        >
                          Done
                        </button>
                      )}

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="
                          bg-red-500
                          text-white
                          px-3
                          py-1
                          rounded
                        "
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          )

        })}

      </div>

      {tasks.length > 0 && (

        <button
          onClick={clearTasks}
          className="
            mt-8
            bg-red-600
            hover:bg-red-700
            text-white
            px-6
            py-3
            rounded-xl
            transition
          "
        >
          Clear All Tasks
        </button>

      )}

    </div>

  )

}