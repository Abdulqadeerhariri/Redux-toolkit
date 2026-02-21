import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

const TodoForm = () => {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault();
        if (!todo) return
        addTodo({ todo, completed: false })
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <input
                type="text"
                placeholder='Add a task, e.g. "Buy groceries"'
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="flex-1 min-w-0 w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
                type='submit'
                className="px-4 py-2 rounded-md bg-accent text-white font-medium shadow hover:brightness-95 w-full sm:w-auto"
            >
                Add
            </button>
        </form>
    )
}

export default TodoForm