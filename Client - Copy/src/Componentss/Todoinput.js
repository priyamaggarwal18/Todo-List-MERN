import React, { useContext, useState, useEffect } from "react";
import axios from'axios'
import { TodoContext } from "../Contexts/TodoContext";
import { LoginContext } from "../Contexts/LoginContext";
import { useNavigate } from "react-router-dom";
import '../Styles/todolist.css';

function Todoinput() {
  const { setListTodo ,listTodo} = useContext(TodoContext);
  const { setLogin, username } = useContext(LoginContext);
  const[message,setMessage]= useState("      ");
  const [mypriority,setMypriority] = useState(1);
  const [mycolor,setMycolor] = useState("none");
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleAddTodo = () => {
    if (inputValue.trim() && mycolor!=="none") {
      axios.post(`http://localhost:8000/api/users/${username}/tasks`,{
        text :inputValue,
        done: false,
        priority:mypriority,
        color:mycolor,
      })
      .then(response =>{
        const updatedTasks=[...listTodo,response.data];
        setListTodo(updatedTasks);
        setInputValue("");

      })
      .catch(error =>{
        console.error("error adding task:",error);
      }); 
    }
    else if(mycolor==="none"){
      setMessage("Please select the priority of your task first.");
    }
    else{
      setMessage("type a task first");
    }
    setMycolor("none");
  };

  const handleLogout = () => {
    setLogin(false);
    navigate('/');
  };

  return (
    <>
    <span className="message_main">{message}</span>
    <div className="input-container">
      <input
        type="text"
        className="input-box-todo"
        placeholder="Enter your Task here"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button className="add-btn" onClick={handleAddTodo}>+</button>
      <button className="logout" onClick={handleLogout}>Logout</button>
      <div className="priority">
        <p>Priority</p>
        <div className="priority_btn_grp">
          <button className="priority_btn" onClick={()=>{
            setMypriority(1);
            setMycolor("lightgreen");
          }}>L</button>
          <button className="priority_btn" onClick={()=>{
            setMypriority(2);
            setMycolor("lightyellow");
          }}>M</button>
          <button className="priority_btn" onClick={()=>{
            setMypriority(3);
            setMycolor("#FF7F7F");
          }}>H</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Todoinput;
