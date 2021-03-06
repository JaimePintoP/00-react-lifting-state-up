import React, { Component } from "react";
import Task from "./Task";
import Summary from "./Summary";
import data from "./../data.js";

class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: data
    };

    this.deleteTaskById = this.deleteTaskById.bind(this);
    /*** 
      We bind the method because it will be invoked by another component (<Task> - object)
      Without binding, `this` will not be refering to the `<ToDoList>` component.
      We `bind` `this` as we need it to point to <ToDoList> component (object) that holds the `state`.
      We can as well create the method as an arrow function to solve this issue of losing context.
    ***/
  }

  /***  
    1. State shouldn't be modified directly and `splice()` modifies the orginal array it's called on. 
    Therefore we're using the spread operator to copy the array first. ;)
    As an alternative we can also use the `.filter` method.
  ***/
  deleteTaskById(id) {
    const taskListCopy = [...this.state.tasks];
    let tasksCompleted = this.state.tasksCompleted;

    taskListCopy.forEach((taskObj, index) => {
      if (taskObj.id === id) {
        taskListCopy.splice(index, 1);
        tasksCompleted--;
      }
    });
    this.setState({ tasks: taskListCopy, tasksCompleted });
  }

  render() {
    return (
      <div>
        <Summary />
        <div className="todo-container">
          {this.state.tasks.map(task => {
            return (
              <Task key={task.id} deleteTask={this.deleteTaskById} {...task} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ToDoList;
