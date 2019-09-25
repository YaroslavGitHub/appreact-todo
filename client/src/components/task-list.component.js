import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
    <tr>
    <td><input 
    type="checkbox" 
    name={props.task.todoname}
    checked={props.task.completed}
  
    ></input></td>
    <td>{props.task.todoname}</td>
    <td>{props.task.description}</td>
  
    <td>
    <Link to={"/edit/"+props.task._id}>edit</Link> | <a href="#" onClick={() => { props.deleteTask(props.task._id) }}>delete</a>
    </td>
  </tr>
)

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this)

    this.state = {tasks: []};
  }

  componentDidMount() {
    axios.get('/tasks/')
      .then(response => {
        this.setState({ tasks: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

  deleteTask(id) {
    axios.delete('/tasks/' + id)
      .then(response => { console.log(response.data)});

    this.setState({
      tasks: this.state.tasks.filter(el => el._id !== id)
    })
  }

  

  taskList() {
    return this.state.tasks.map(currenttask => {
      return <Task task={currenttask} deleteTask={this.deleteTask} key={currenttask._id}/>;
    })
  }

  render() {
    return (
      <div className="container pad">
      <p className="text-center b"><strong>SIMPLE TODO LISTS</strong></p>
      <p className="text-center c">
        FROM RUBI GARAGE
      </p>
      
        <table className="table text-left bg-white pad marg text-white text-secondary">

          <tbody>
            { this.taskList() }
          </tbody>
        </table>
        <br/>
        <br/>
      </div>
    )
  }
}
