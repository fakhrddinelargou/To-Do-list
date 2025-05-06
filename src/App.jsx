import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const inputValue = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inpContent = inputValue.current.value;
      if (inpContent !== "") {
        const newItem = { completed: false, inpContent };
        setTodos([...todos, newItem]);

        inputValue.current.value = "";
      } else {
        console.log("error");
      }
    } else {
      return "error";
    }
  };

  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
  };

  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);

    setTodos(newTodos);
  };
  const clearCheck = () => {
    const newTodos = [...todos];
    const filteredTodos = newTodos.filter((todo) => !todo.completed);
    setTodos(filteredTodos);
  };

  const deleteAll = () => {
    setTodos([]);
    inputValue.current.value = "";
  };

  const nightMode = () => {
    document.querySelector(".day").style.display = "flex";
    document.querySelector(".night").style.display = "none";
    document.getElementById("root").style.background = "rgb(167, 167, 167)";
    document.querySelector(".card").style.background = "black";

    document.querySelector(".title").style.color = "white";
  };

  const dayMode = () => {
    document.querySelector(".night").style.display = "flex";
    document.querySelector(".day").style.display = "none";
    document.getElementById("root").style.background = "aliceblue";

    document.querySelector(".title").style.color = "black";

    document.querySelector(".card").style.background = "white";
    document.querySelector("title").style.color = "black";
  };
  console.log(todos);

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
            ref={inputValue}
          />
          <div className="clearCheck" onClick={clearCheck}>
            Clear
          </div>
          <span className="modes">
            <div className="night" onClick={nightMode}>
              🌙
            </div>
            <div className="day" onClick={dayMode}>
              ☀️
            </div>
          </span>
        </div>
        <ul>
          {todos.map(({ inpContent }, index) => {
            return (
              <div className="task">
                <li key={index}>
                  <input
                    onClick={() => handleItemDone(index)}
                    id="checkbox"
                    type="checkbox"
                  />

                  <label className="taskWrt"> {inpContent}</label>
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
