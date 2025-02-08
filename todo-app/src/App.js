import axios from "axios"
import React, {useEffect, useState} from "react";

function App() {

    const [value,setValue] = useState("")
    const [todos, setTodos] = useState([])

    function handleNewTodo(){
        if (value === "") return;
        axios
            .post("http://127.0.0.1:8000/todos", {title: value})
            .then(()=> fetchTodos())

    }

    function fetchTodos(){
        axios.get("http://127.0.0.1:8000/todos").then((res) => setTodos(res.data))
    }


    function deleteTodo(id){
        if(!window.confirm("You are about to delete. Are you sure?")){
            return
        }

        axios
            .delete(`http://127.0.0.1:8000/todos/${id}`, {title: value})
            .then(()=> fetchTodos())
    }

    function updateTodo(id,e){
        e.preventDefault()
        axios
            .put(`http://127.0.0.1:8000/todos/${id}`, {title: e.target[0].value})
            .then(()=> fetchTodos())

    }

    useEffect(() => {
        fetchTodos()
    }, []);

    return (
      <div>
        <h1> My ToDo App</h1>
          <label>Add New ToDo: </label>
          <input className="input-todo" type="text" onChange={(e)=> setValue(e.target.value)} />
          <button className="add-button" onClick={handleNewTodo}> + ADD  </button>


          <ul className="todo-list">
              {todos.map(todo => (
                  <li key={todo.id} className="todo-item">

                      <form onSubmit={(e)=> updateTodo(todo.id,e)}>
                          <input defaultValue={todo.title}/>

                          <div>
                              <button type="submit" className="update-btn">
                                  Save
                              </button>

                              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                                  Delete
                              </button>
                          </div>
                      </form>


                  </li>
              ))}
          </ul>


      </div>


    );
}

export default App;
