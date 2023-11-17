import React, {useState} from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists";

const initialTodoData = localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : [];

export default function App(){
  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  const handleRemoveAll = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }
  
  return(
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-5 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={handleRemoveAll}>Delete All</button>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form value={value} setValue={setValue} setTodoData={setTodoData} todoData={todoData} />
        
      </div>
    </div>
  )
}
