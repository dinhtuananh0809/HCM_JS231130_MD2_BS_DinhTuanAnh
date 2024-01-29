import { useEffect, useState } from "react";
import "./Style.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { v4 as uuidv4 } from "uuid";

const ListToDo = () => {
  const [todo, setTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodo(storedTodos);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedTodos = [...todo];
      updatedTodos[editIndex].title = editValue;
      setTodo(updatedTodos);
      setEditIndex(null);
      setEditValue("");
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    } else {
      if (editValue.trim() !== "") {
        const newTodo = {
          id: uuidv4(),
          title: editValue,
          completed: false,
        };
        const newTodos = [...todo, newTodo];
        setTodo(newTodos);
        setEditValue("");
        localStorage.setItem("todos", JSON.stringify(newTodos));
      }
    }
  };

  const handleEdit = (index) => {
    const newTitle = window.prompt("Cập nhật công việc", todo[index].title);
    if (newTitle !== null) {
      const updatedTodos = [...todo];
      updatedTodos[index].title = newTitle;
      setTodo(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  const handleDelete = (index) => {
    const updatedTodos = [...todo];
    updatedTodos.splice(index, 1);
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todo];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodo(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div>
      <form className="container" onSubmit={(e) => handleSubmit(e, null)}>
        <h1>Danh sách công việc</h1>
        <div className="container-infor">
          <div className="container-infor-input">
            <input
              type="text"
              name="todo"
              placeholder="Nhập tên công việc"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <button type="submit">Thêm</button>
          </div>
          <ul>
            {todo.map((item, index) => (
              <li key={item.id} className="container-infor-check">
                <div className="check-info">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={item.completed}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <p>{item.title}</p>
                </div>
                <div className="check-icon">
                  <button onClick={() => handleEdit(index)}>
                    <EditIcon style={{ color: "orange" }} />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <DeleteForeverIcon style={{ color: "red" }} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="checkList">
          <p>
            Công việc hoàn thành: {todo.filter((item) => item.completed).length}
          </p>
        </div>
      </form>
    </div>
  );
};

export default ListToDo;
