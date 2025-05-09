import { useState } from "react";
import "./App.css";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
// import { LeafyGreen } from "lucide-react";
function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue !== "") {
      const newItem = { completed: false, taskName: inputValue };
      setTodos((prev) => {
        return [...prev, newItem];
      });
      setInputValue("");
    }
  };

  const handleItemDone = (index) => {
   setTodos((prev) => {
      console.log(prev);
      const newTask = [...prev].map((el, i) => {
        if (index === i) {
          el.completed = true;
        }
        return el
      });
 

      return newTask;
    });
  };

  const handleDeleteItem = (index) => {
    
    setTodos((prev)=>{
      
      const newTodos = [...prev];
      newTodos.splice(index, 1);
      return newTodos
    });
  };
  const clearCheck = () => {
    setTodos((prev)=>{
      
      const newTodos = [...prev];
      const filteredTodos = newTodos.filter((todo) => !todo.completed);

      return filteredTodos

    });





  };

  const deleteAll = () => {
    setTodos([]);
    setInputValue('');
  };


  return (
    <>
      <div className="card">
        <div className="head">
          <h2 className="title"> To Do List</h2>
          <div onClick={deleteAll} className="deleteAll">
            Clear All
          </div>
        </div>
        <div className="inp-modes">
          <input
            type="text"
            id="input"
            placeholder="Enter Your Task..."
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={(el) => {
              setInputValue(el.target.value);
            }}
          />
          <div className="clearCheck" onClick={clearCheck}>
            Clear
          </div>
        
        </div>
        <ul>
          {todos.map(({ taskName , completed}, index) => {
            return (
              <div className="task" key={index}  >
                <li key={taskName}>
                  <input
                  onClick={()=>  handleItemDone(index)}
                    id="checkbox"
                    value={completed}
                    type="checkbox"
                  />

                  <label className="taskWrt">{taskName}</label>
                </li>
                <span
                  className="delete"
                  onClick={() => handleDeleteItem(index)}
                >
                  ❌
                </span>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
