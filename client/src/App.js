import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component";
import TaskList from "./components/task-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateTodo from "./components/create-todo.component";

function App() {
  return (
    <Router>
    
    <br/>
    <Route path="/" exact component={TaskList} />
    <Route path="/edit/:id" exact component={EditTask} />
    <Route path="/create" exact component={CreateTask} />
    <Route path="/todo" exact component={CreateTodo} />
    <br/>
    <Navbar />

    </Router>
  );
}

export default App;
