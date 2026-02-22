import React from 'react'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-white">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <header className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Simple Redux Todo</h1>
          <p className="text-sm text-gray-500 mt-1">A friendly, responsive todo app built with React + Redux Toolkit</p>
        </header>

        <main>
          <AddTodo />
          <Todos />
        </main>
      </div>
    </div>
  )
}

export default App