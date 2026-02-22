import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../feature/todoSlice'

function AddTodo() {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()

  const addTodoHandler = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    dispatch(addTodo(input.trim()))
    setInput('')
  }

  return (
    <form onSubmit={addTodoHandler} className="flex flex-col sm:flex-row gap-3 items-center">
      <label htmlFor="todo-input" className="sr-only">Add todo</label>
      <input
        id="todo-input"
        type="text"
        placeholder="Write a todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full px-4 py-2 border text-white border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors w-full sm:w-auto"
      >
        Add
      </button>
    </form>
  )
}

export default AddTodo