import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoname = this.onChangeTodoname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todoname: ''
    }
  }

  onChangeTodoname(e) {
    this.setState({
      todoname: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const todo = {
      todoname: this.state.todoname
    }

    console.log(todo);

    axios.post('/todos/add' , todo)
      .then(res => console.log(res.data));

    this.setState({
      todoname: ''
    })
    window.location = '/';
  }

  render() {
    return (
      <div className="container pad">
        <h3>Create New TODO list</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Create new Todo List: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.todoname}
                onChange={this.onChangeTodoname}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Add TODO List" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}