import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'
import { LoginContext } from '../Contexts/LoginContext';
import Todo from './Todo';
function Home() {
    const{login}=useContext(LoginContext)
    const navigate=useNavigate();
    function loginclick(){
        navigate('/login');
    }
  return (
    <div className="App">
{login ? (
    <Todo/>
      ) : (
        <div className='container'>
          <h1>Welcome to My Todo List</h1>
          <button className="my-btn" onClick={loginclick}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Home
