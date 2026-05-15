import React from 'react'

export default function ProgressTracker({ tasks }) {

  const completedTasks = tasks.filter((t) => t.completed).length

  const totaltasks = tasks.length

  const percentage =
    totaltasks === 0
      ? 0
      : (completedTasks / totaltasks) * 100

  return (

    <div
      className="
        bg-white
        p-6
        rounded-2xl
        shadow-md
        mt-6
      "
    >

      <div className="flex justify-between items-center mb-3">

        <h2 className="text-xl font-bold text-gray-800">
          Progress Tracker
        </h2>

        <span className="text-blue-600 font-semibold">
          {Math.round(percentage)}%
        </span>

      </div>

      <p className="text-gray-600 mb-4">

        {completedTasks} out of {totaltasks} tasks completed

      </p>

      <div
        className="
          w-full
          h-4
          bg-gray-200
          rounded-full
          overflow-hidden
        "
      >

        <div
          className="
            h-full
            bg-blue-600
            rounded-full
            transition-all
            duration-500
          "
          style={{ width: `${percentage}%` }}
        >

        </div>

      </div>

    </div>
  )
}