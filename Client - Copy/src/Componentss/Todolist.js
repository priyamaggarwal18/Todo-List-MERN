import React, { useContext } from "react";
import { IoMdDoneAll } from "react-icons/io";
import axios from "axios";
import { TodoContext } from "../Contexts/TodoContext";
import '../Styles/todolist.css';
import { LoginContext } from "../Contexts/LoginContext";

function TodoList() {
  const { listTodo, setListTodo } = useContext(TodoContext);
  const { username } = useContext(LoginContext); 

  const sortTaskPriority = (tasks) => {
    return tasks.sort((a, b) => {
      return b.priority - a.priority;
    });
  }

  const handleDeleteTodo = (taskID) => {
    axios.delete(`http://localhost:8000/api/users/${username}/tasks/${taskID}`)
      .then(() => {
        setListTodo(listTodo.filter((task) => task.id !== taskID));
      })
      .catch(error => {
        console.error("Error in deleting task:", error);
      });
  };

  const handleDone = (taskID) => {
    const taskToUpdate = listTodo.find((task) => task.id === taskID);
    const updatedDone = !taskToUpdate.done;
    axios.patch(`http://localhost:8000/api/users/${username}/tasks/${taskID}`, { done: updatedDone })
      .then(response => {
        const updatedTasks = listTodo.map(task => task.id === taskID ? { ...task, done: updatedDone } : task);
        setListTodo(updatedTasks);
      })
      .catch(error => {
        console.error("Error updating the task", error);
      })
  };

  return (
    <div className="todo-list">
      {sortTaskPriority(listTodo).map((task) => (
        <div className={`note ${task.done ? 'done' : ''}`} key={task.id} style={{ backgroundColor: task.color }}>
          <p>{task.text}</p>
          <div className="btns">
            <button className={`${task.done ? "btn-1" : "btn-2"}`} onClick={() => handleDone(task.id)}><IoMdDoneAll /></button>
            <button className="btn-2" onClick={() => handleDeleteTodo(task.id)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
