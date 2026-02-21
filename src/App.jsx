import React, { useState, useEffect } from 'react'
import { TodoProvider } from './context/TodoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import Todoitem from './components/TodoItems'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  const editTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggle = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id == id ? {
      ...prevTodo, completed: !prevTodo.completed
    } : prevTodo)))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, editTodo, deleteTodo, toggle }}>
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 shadow-lg rounded-lg p-6">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Todo App</h1>
              <p className="text-sm text-slate-500">Built with localStorage • Clean, responsive UI</p>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{todos.length} {todos.length === 1 ? 'item' : 'items'}</div>
          </header>

          <TodoForm />

          <div className="mt-6 space-y-3 todo-app-scroll">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-slate-500">No todos yet — add your first task.</div>
            ) : (
              todos.map((todo) => (
                <Todoitem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
