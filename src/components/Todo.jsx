import React from 'react'

function Todo({ todo, onDelete }) {
  return (
    <div>
        <div>{todo.title}</div>
        <button onClick={() => onDelete(todo.id)}>X</button>
    </div>
  )
}

export default Todo