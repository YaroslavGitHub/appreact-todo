import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <div className="container pad">
      <nav className="navbar text-white text-left bg-primary pad1 d-inline">
        <Link to="/todo" className="nav-link text-white d-inline">Add TODO List</Link>
        <Link to="/" className="nav-link text-white d-inline">Tasks</Link>
        <Link to="/create" className="nav-link text-white d-inline">Create Task</Link>
      
        
      </nav>
      </div>
    );
  }
}