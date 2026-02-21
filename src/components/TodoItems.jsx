import React, { useState, useRef, useEffect } from 'react'
import { useTodo } from '../context/TodoContext'

export default function Todoitem({ todo }) {
    const [isEdit, setIsEdit] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { editTodo, deleteTodo, toggle } = useTodo();
    const inputRef = useRef(null)

    useEffect(() => {
        setTodoMsg(todo.todo)
    }, [todo.todo])

    const editMsg = () => {
        if (!todoMsg.trim()) return
        editTodo(todo.id, { ...todo, todo: todoMsg })
        setIsEdit(false)
    }
    const toggleMsg = () => {
        toggle(todo.id)
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-md border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
            <input
                aria-label="toggle todo"
                type="checkbox"
                checked={todo.completed}
                onChange={toggleMsg}
                className="w-4 h-4 text-accent rounded"
            />

            <input
                ref={inputRef}
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isEdit}
                className={`flex-1 min-w-0 px-3 py-2 bg-transparent border-none focus:outline-none ${todo.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}
            />

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <button
                    onClick={() => {
                        if (todo.completed) return;
                        if (isEdit) {
                            editMsg()
                        } else {
                            setIsEdit(true)
                            setTimeout(() => inputRef.current?.focus(), 50)
                        }
                    }}
                    className="px-3 py-1 rounded-md text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
                >
                    {isEdit ? 'Update' : 'Edit'}
                </button>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-3 py-1 rounded-md text-sm border-white bg-red-50 text-red-600 hover:bg-red-100"
                >
                    Delete
                </button>
            </div>
        </div>
    )

}