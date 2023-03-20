import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link';
import React, { useState } from 'react'
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const AddTodo = () => {
  const [todoTitle, setTodoTitle] = useState<string>('');
  // idをページ変更や更新しても保持したい
  const { persistAtom } = recoilPersist();
  const idState = atom({
    key: 'id',
    default: 0,
    effects_UNSTABLE: [persistAtom]
  });
  const [todoId, setTodoId] = useRecoilState(idState)

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
      <h2>TODO作成</h2>
      <form onSubmit={handleAddTodo}>
          <input
          type='text'
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          />
          <button>追加</button>
      </form>
      <Link href='/'>一覧に戻る</Link>
    </div>
  )
}

export default AddTodo