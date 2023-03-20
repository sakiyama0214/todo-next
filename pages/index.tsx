import { db } from '@/lib/firebase';
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import Link from 'next/link';

type Todo = {
  id: number;
  title: string;
  status: string;
}

export default function Home() {
  const [todos, setTodos] = useState<any>([])
  const [newTitle, setNewTitle] = useState('');

  const onClickDelete = async(id: any) => {
    const docRef = doc(db, 'todos', id);
    await deleteDoc(docRef);
  }
  

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('id'));
    const unSub = onSnapshot(q, async (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => doc.data())
      )
    })
  }, []);


  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <h2>Todo List</h2>
      <Link href='/AddTodo'>Todo作成</Link>
      <div className='todoList'>
        <ul>
          {todos.map((todo: any) => {
            const todoInfo = {id: todo.id, title: todo.title, status: todo.status}
            return (
              <li key={todo.id}>
                <p>{todo.title}</p>
                <select
                  value={todo.status}
                >
                  <option>未着手</option>
                  <option>作業中</option>
                  <option>完了</option>
                </select>
                <Link href={{ pathname: `/todos/${todo.id}`, query: todoInfo}}><button>編集</button></Link>
                <button onClick={()=> onClickDelete(todo.id)}>削除</button>
              </li>
            )
          })}
          
        </ul>
      </div>
    </>
  )
}
