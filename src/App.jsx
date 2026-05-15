import React, { useEffect, useState } from 'react'

import TaskForm from './components/TaskForm'

import './style.css'

export default function App() {

  const [tasks, setTasks] = useState(() => {

    const savedTasks =
      localStorage.getItem("tasks")

    return savedTasks
      ? JSON.parse(savedTasks)
      : []

  })

  const [search, setSearch] = useState("")

  // Inline Editing States

  const [editingTaskId, setEditingTaskId] =
    useState(null)

  const [editedText, setEditedText] =
    useState("")

  useEffect(() => {

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    )

  }, [tasks])

  // Add Task

  const addTask = (task) => {

    setTasks([...tasks, task])

  }

  // Move Task

  const moveTask = (id, newStatus) => {

    const updatedTasks = tasks.map(task =>

      task.id === id
        ? { ...task, status: newStatus }
        : task

    )

    setTasks(updatedTasks)

  }

  // Delete Task

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

  // Clear All

  const clearTasks = () => {

    setTasks([])

  }

  return (

    <div className="
      p-6
      bg-gray-300
      min-h-screen
    ">

      {/* Header */}

      <header className="
        mb-8
        text-center
      ">

        <h1 className="
          text-5xl
          font-bold
          text-blue-600
        ">
          TaskBuddy
        </h1>

        <p className="
          text-gray-600
          mt-2
        ">
          Your Friendly Kanban Board
        </p>

      </header>

      {/* Task Form */}

      <TaskForm addTask={addTask} />

      {/* Search */}

      <div className="mt-6 mb-6 flex justify-center">

        <input
          type="text"

          placeholder="Search tasks..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

          className="
            w-full
            max-w-xl
            p-3
            rounded-xl
            border
            border-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-600
          "
        />

      </div>

      {/* Columns */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">

        {["todo", "progress", "done"].map((status, index) => {

          const titles = [
            "To Do",
            "In Progress",
            "Done"
          ]

          return (

            <div
              key={status}

              className="
                bg-white
                p-4
                rounded-xl
                shadow
              "
            >

              <h2 className="
                text-2xl
                font-bold
                mb-4
              ">
                {titles[index]}
              </h2>

              {tasks

                .filter(task =>

                  task.status === status &&

                  task.text
                    .toLowerCase()
                    .includes(
                      search.toLowerCase()
                    )

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

                        onBlur={() =>
                          handleSave(task.id)
                        }

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
                        onClick={() =>
                          handleEdit(task)
                        }

                        className="
                          cursor-pointer
                          font-medium
                        "
                      >
                        {task.text}
                      </p>

                    )}

                    {/* Buttons */}

                    <div className="
                      flex
                      flex-wrap
                      gap-2
                      mt-3
                    ">

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
                        onClick={() =>
                          deleteTask(task.id)
                        }

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

      {/* Clear All */}

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
