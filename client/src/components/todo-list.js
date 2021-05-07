import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Todo = (props) => {
  const handleClick = () => {
    props.onDelete(props.todo._id);
    window.location.reload(false);
  };
  let todo_description = props.todo.todo_description;
  let todo_responsible = props.todo.todo_responsible;
  let todo_priority = props.todo.todo_priority;
  let todo_completed = props.todo.todo_completed;
  return (
    <tr>
      <td className={todo_completed ? "completed" : ""}>{todo_description}</td>
      <td className={todo_completed ? "completed" : ""}>{todo_responsible}</td>
      <td className={todo_completed ? "completed" : ""}>{todo_priority}</td>
      <td>
        <Link to={"/edit/" + props.todo._id}>Edit</Link>
      </td>
      <td onClick={() => handleClick()}>Delete</td>
    </tr>
  );
};

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then((res) => {
        this.setState({ todos: res.data });
      })
      .catch((err) => console.error(err));
  }

  todoList() {
    return this.state.todos.map((currentTodo, i) => {
      return <Todo todo={currentTodo} onDelete={this.handleDelete} key={i} />;
    });
  }

  handleDelete(id) {
    axios
      .delete("http://localhost:4000/todos/" + id)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
