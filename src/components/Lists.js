import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({ todoData, setTodoData }) => {
  // 드래그 앤 드롭이 끝났을 때의 이벤트 함수
  const handleEnd = (result) => {
    console.log(result);

    if(!result.destination) return;

    const newTodoData = todoData;

    // 1. 변경시키는 아이템을 배열에서 지워줌.
    // 2. return 값으로 지워진 아이템을 잡아줌.
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    // 목적지의 인덱스 위치에 아이템을 추가.
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    // 상태 변경
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  }

  return (
    <div>
        <DragDropContext onDragEnd={handleEnd}>
            <Droppable droppableId='todo'>
                {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {todoData.map((data, index) => (
                        <Draggable
                            key={data.id}
                            draggableId={data.id.toString()}
                            index={index}
                        >
                            {(provided, snapshot) => (
                              <List 
                                key={data.id}
                                id={data.id}
                                title={data.title}
                                completed={data.completed}
                                todoData={todoData}
                                setTodoData={setTodoData}
                                provided={provided}
                                snapshot={snapshot}
                              />
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>
  )
})

export default Lists;
