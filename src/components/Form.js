import React from 'react'

export default function Form({ value, setValue, setTodoData, todoData }) {
    // input change됐을때 이벤트 함수
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  // Submit 버튼 이벤트 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false
    };

    // 함수를 넣어주면 이전 데이터 값을 받아올수 있음
    setTodoData(prev => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue("");
  }

  return (  
    <form onSubmit={handleSubmit} className='flex pt-2'>
        <input
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        type="text"
        name="value"
        placeholder="해야 할 일을 입력하세요."
        value={value}
        onChange={handleChange}
        />
        <input
        className='p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200'
        type="submit"
        value="입력"
        />
    </form>
    
  )
}
