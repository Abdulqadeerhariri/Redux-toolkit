import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo } from '../feature/todoSlice'

const Todos = () => {
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch()

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-700">Todos</h2>
        <span className="text-sm text-gray-500">{todos.length} item(s)</span>
      </div>

      {todos.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">No todos yet. Add one above.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm"
            >
              <span className="break-words">{todo.text}</span>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                aria-label={`Delete ${todo.text}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Todos