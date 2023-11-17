import React, { useState } from 'react'

const List = React.memo(({
    id, title, completed, todoData, setTodoData, provided, snapshot
}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);

     // 체크박스 체크 했을때 이벤트 함수
  const handleCheck = (id) => {
    let newTodoData = todoData.map((data) => {
      if(data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    })
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }

  // x 버튼 이벤트함수
  const handleClick = (id) =>{
    let newTodoData = todoData.filter((data) => data.id !== id)
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }

  // 수정 모드에서 input 값이 바뀔 때 이벤트 함수
  const handleEditChange = (e) => {
    setEditedTitle(e.target.value);
  }

  // 수정 모드 form태그 submit 됐을 경우 이벤트함수
  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodoData = todoData.map((data) => {
        if(data.id === id) data.title = editedTitle;
        return data;
    })
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
    setIsEditing(false);
    
  }

  if(isEditing){
    return (
        <div
            className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded"
        >
            <form>
                <input 
                    value={editedTitle}
                    onChange={handleEditChange}
                    className='w-full px-3 py-2 mr-4 text-gray-500 rounded'
                    autoFocus
                />
            </form>
        
            <div className='items-center'>
                <button type='submit' className='mx-5' onClick={handleSubmit}>save</button>
                <button onClick={() => setIsEditing(false)}>x</button>
            </div>
        </div>
    )
  }
  else {
    return (
        <div 
            key={id} 
            {...provided.draggableProps} ref={provided.innerRef} 
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`} 
        >
            <div className='items-center'>
                <input type="checkbox" defaultChecked={completed} onChange={() => handleCheck(id)}/>
            </div>
            <span className={completed? 'line-through' : undefined}>{title}</span>
            <div className='items-center'>
                <button className='mx-5' onClick={() => setIsEditing(true)}>edit</button>
                <button onClick={() => handleClick(id)}>x</button>
            </div>
        </div>
      )
  }
  
})

export default List;