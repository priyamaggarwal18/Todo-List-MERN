import React, { useContext, useState, useEffect } from "react";
import { LoginContext } from "../Contexts/LoginContext";
import { TodoContext } from "../Contexts/TodoContext";
import Todoinput from "../Componentss/Todoinput";
import TodoList from "../Componentss/Todolist";
import '../Styles/Todo.css';
import axios from "axios";

function Todo() {
  const { username } = useContext(LoginContext);
  const [listTodo, setListTodo] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${username}/tasks`)
      .then(response => {
        setListTodo(response.data);
      })
      .catch(error => {
        console.error("Error fetching tasks: ", error);
      });
  }, [username, setListTodo]);

  return (
    <TodoContext.Provider value={{ listTodo, setListTodo }}>
      <div className="center-container">
        <h1>Hi {username}👋!</h1>
        <Todoinput />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}

export default Todo;
