import React, { useState } from 'react'

export default function TaskList({
  title,
  tasks,
  moveTask,
  deleteTask,
  updateTask
}) {

  // Inline Editing States

  const [editingTaskId, setEditingTaskId] =
    useState(null)

  const [editedText, setEditedText] =
    useState("")

  // Priority Colors

  const priorityColors = {
    High: "border-red-500",
    Medium: "border-yellow-500",
    Low: "border-green-500"
  }

  // Priority Sorting

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  }

  // Start Editing

  const handleEdit = (task) => {

    setEditingTaskId(task.id)

    setEditedText(task.text)

  }

  // Save Task

  const handleSave = (id) => {

    updateTask(id, editedText)

    setEditingTaskId(null)

    setEditedText("")

  }

  return (

    <div
      className="
        bg-gray-100
        p-4
        rounded-2xl
        min-h-[500px]
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-6
          text-gray-800
        "
      >
        {title}
      </h2>

      <ul className="space-y-4">

        {[...tasks]

          .sort((a, b) =>

            priorityOrder[a.priority]
            -
            priorityOrder[b.priority]

          )

          .map((task) => (

            <li
              key={task.id}

              className={`
                bg-white
                p-4
                rounded-xl
                shadow-md
                border-l-4
                ${priorityColors[task.priority]}
              `}
            >

              <div>

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
                      border
                      border-gray-400
                      rounded-lg
                      p-2
                      outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                    "
                  />

                ) : (

                  <h3
                    onClick={() =>
                      handleEdit(task)
                    }

                    className="
                      text-lg
                      font-semibold
                      text-gray-800
                      cursor-pointer
                    "
                  >
                    {task.text}
                  </h3>

                )}

                <p className="text-gray-500 mt-1">
                  {task.priority} • {task.category}
                </p>

              </div>

              {/* Buttons */}

              <div className="
                flex
                flex-wrap
                gap-2
                mt-4
              ">

                {/* Move Left */}

                {task.status !== "todo" && (

                  <button
                    onClick={() =>

                      moveTask(
                        task.id,

                        task.status === "done"
                          ? "progress"
                          : "todo"
                      )

                    }

                    className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    ←
                  </button>

                )}

                {/* Move Right */}

                {task.status !== "done" && (

                  <button
                    onClick={() =>

                      moveTask(
                        task.id,

                        task.status === "todo"
                          ? "progress"
                          : "done"
                      )

                    }

                    className="
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    →
                  </button>

                )}

                {/* Delete */}

                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }

                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  Delete
                </button>

              </div>

            </li>

          ))}

      </ul>

      {/* Tailwind Safe Classes */}

      <div className="
        hidden
        border-red-500
        border-yellow-500
        border-green-500
      ">
      </div>

    </div>

  )

}
