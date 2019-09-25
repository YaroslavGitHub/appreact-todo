import React, { Component } from 'react';
import axios from 'axios';

export default class EditTask extends Component {
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
    axios.get('/tasks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          todoname: response.data.todoname,
          description: response.data.description,
          completed: response.data.completed,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('/todos/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            todos: response.data.map(todo => todo.todoname),
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
    const {name, value, type, checked} = e.target
    type === "checkbox"?this.setState({ [name]: checked}) : this.setState({ [name]: value})
  }


  onSubmit(e) {
    e.preventDefault();

    const task = {
      todoname: this.state.todoname,
      description: this.state.description,
      completed: this.state.completed,
    }

    console.log(task);

    axios.post('/tasks/update/' + this.props.match.params.id, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div className="container pad">
      <h3>Edit Task</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>TodoName: </label>
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
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Checked </label>
          <input 
              type="checkbox" 
              name="completed"
              className="form-control"
              checked={this.state.completed}
              onChange={this.handleChange}
              />
        </div>
 

        <div className="form-group">
          <input type="submit" value="Save Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}