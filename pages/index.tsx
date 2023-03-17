import { db } from '@/lib/firebase';
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { async } from '@firebase/util';
import Link from 'next/link';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from "recoil-persist";

type Todo = {
  id: number;
  title: string;
  status: string;
}

export default function Home() {
  const [todos, setTodos] = useState<any>([])
  const [todoTitle, setTodoTitle] = useState<string>('');
  // const [todoId, setTodoId] = useState<number>(0)
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
                <button>編集</button>
                <button>削除</button>
              </li>
            )
          })}
          
        </ul>
      </div>
    </>
  )
}
