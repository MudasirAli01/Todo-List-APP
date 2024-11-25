import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);  
    }
  }, []);

  const saveTodoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveTodoLS();
  };

  const handleEdit = (id) => {
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveTodoLS();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveTodoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 min-h-[70vh] w-full max-w-3xl bg-violet-50 rounded-xl shadow-lg">
        <h1 className="font-bold text-center text-2xl sm:text-xl">
          Mudasir's Todo-App
        </h1>

        {/* Add Todo Section */}
        <div className="addTodo my-5 flex flex-col gap-4">
          <div className="text-lg font-bold">
            <h2>Add a Todo</h2>
          </div>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="rounded-md p-2 border w-full"
            placeholder="Enter your task"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-blue-600 hover:bg-blue-800 p-3 py-1 disabled:bg-blue-400 text-white rounded-md cursor-pointer font-bold text-sm w-full sm:w-auto"
          >
            Add
          </button>
        </div>

        {/* Todos Section */}
        <div>
          <label className="flex items-center gap-2">
            <input
              onChange={toggleFinished}
              type="checkbox"
              checked={showFinished}
              className="accent-blue-600"
            />
            Show Finished
          </label>
          <h2 className="text-xl font-bold mt-4">Your Todos</h2>
          <div className="todos mt-5">
            {todos.length === 0 && (
              <div className="m-5 text-center text-gray-500">
                No Todos to display
              </div>
            )}
            {todos.map(
              (item) =>
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex items-center justify-between w-full bg-white p-3 rounded-md shadow-md my-2"
                  >
                    {/* Todo Text and Checkbox */}
                    <div className="flex items-center gap-3 sm:gap-5">
                      <input
                        name={item.id}
                        onChange={handleCheckBox}
                        type="checkbox"
                        checked={item.isCompleted}
                        className="accent-green-600"
                      />
                      <div
                        className={`text-base ${
                          item.isCompleted ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {item.todo}
                      </div>
                    </div>

                    {/* Edit and Delete Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-green-600 hover:bg-green-800 w-10 h-10 text-white rounded-full flex items-center justify-center"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-800 w-10 h-10 text-white rounded-full flex items-center justify-center"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
