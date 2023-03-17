import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'

const AddTodo = () => {
    const [todoTitle, setTodoTitle] = useState<string>('');
     const [todoId, setTodoId] = useState<number>(0)

    const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (todoTitle === '') return;
        await addDoc(collection(db, 'todos'), {
          id: todoId,
          title: todoTitle,
          status: 'notStarted',
        });
        setTodoId(todoId + 1);
        setTodoTitle('');
      }
  return (
    <div className='inputForm'>
    <form onSubmit={handleAddTodo}>
        <input
        type='text'
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button>追加</button>
    </form>
      </div>
  )
}

export default AddTodo