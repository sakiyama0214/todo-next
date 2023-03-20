import { useRouter } from "next/router"
import { useState } from "react";

const Todo = () => {
  const router = useRouter();
  const {id} = router.query;
  const [newTitle, setNewTitle] = useState('');
  return (
    <>
      <div>
        <h2>TODO編集</h2>
        <input
            type='text'
            placeholder='TODOを編集'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
        />
        <button>編集する</button>
      </div>
      <div>
        <p>{todo.title}</p>
        <select
          value={todo.status}
        >
          <option>未着手</option>
          <option>作業中</option>
          <option>完了</option>
        </select>
      </div>
    </>
    
  )
}


export default Todo;