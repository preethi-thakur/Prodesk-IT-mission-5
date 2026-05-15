import React, { useState } from 'react'

export default function TaskForm({ addTask }) {

  const [task, setTask] = useState('')
  const [priority, setPriority] = useState("Medium")
  const [category, setCategory] = useState("General")

  const handlesubmit = (e) => {

    e.preventDefault()

    if (!task.trim()) return

  addTask({
  id: Date.now(),
  text: task,
  priority,
  category,
  status: "todo"
})

    setTask('')
    setPriority("Medium")
    setCategory("General")
  }

  return (

    <form
      onSubmit={handlesubmit}
      className="
        bg-white
        p-6
        rounded-2xl
        shadow-md
        space-y-4
        mb-7
      "
    >

      <div className="flex gap-4 ">

        <input
          type="text"
          placeholder="Enter Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="
            flex-1
            border
            border-gray-300
            p-3
            rounded-xl
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

        <button
          type="submit"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            transition
            font-medium
          "
        >
          Add Task
        </button>

      </div>

      <div className="flex gap-4">

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="
            border
            border-gray-300
            p-3
            rounded-xl
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        >

          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>

        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            border
            border-gray-300
            p-3
            rounded-xl
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        >

          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>

        </select>

      </div>

    </form>
  )
}