import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoname = this.onChangeTodoname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todoname: '',
      description: '',
      completed: false,
      todos: []
    }
  }

  componentDidMount() {
    axios.get('/todos/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            todos: response.data.map(todo => todo.todoname),
            todoname: response.data[0].todoname
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeTodoname(e) {
    this.setState({
      todoname: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }


  handleChange(e) {
    this.setState({
      completed: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();

    const task = {
      todoname: this.state.todoname,
      description: this.state.description,
      completed: this.state.completed,
    }

    console.log(task);

    axios.post('/tasks/add', task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Choose TODO List: </label>
          <select ref="todoInput"
              required
              className="form-control"
              value={this.state.todoname}
              onChange={this.onChangeTodoname}>
              {
                this.state.todos.map(function(todo) {
                  return <option 
                    key={todo}
                    value={todo}>{todo}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              placeholder="Start typing here to create a task"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Add Task" className="btn btn-success" />
        </div>
      </form>
    </div>
    )
  }
}