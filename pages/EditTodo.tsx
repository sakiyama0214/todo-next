import React, { useState } from 'react'

const EditTodo = () => {
    const [newTitle, setNewTitle] = useState('');
  return (
    <div>
        <h2>TODO編集</h2>
        <input
            type='text'
            placeholder='TODOを編集'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
        />
    </div>
  )
}

export default EditTodo