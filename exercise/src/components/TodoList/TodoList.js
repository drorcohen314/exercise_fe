import {Container,Form , Button} from 'react-bootstrap'
import React from 'react'
import Task from './../Task/Task'
import axios from 'axios';
import {connection_data} from '../../global'

class TodoList extends React.Component {
    constructor() {
        super()
        this.state = {
            tasks:[],
            newTask:""
        }
        this.addTask = this.addTask.bind(this)
        this.handleTaskChange = this.handleTaskChange.bind(this)
        this.markTask = this.markTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
    }

    getTasks() {
        axios.get(connection_data.backend_host + ":" + connection_data.backend_port + "/tasks")
      .then(res => {
        this.setState({ tasks: res.data });
      })
    }

    componentDidMount() {
        this.getTasks()
    }

    async addTask() {
      if (this.state.newTask != "") {
        await axios.post(connection_data.backend_host + ":" + connection_data.backend_port +'/newTask', {
          task: this.state.newTask
        }).then(this.getTasks());
      }
    }

    async removeTask(id) {
      await axios.delete(connection_data.backend_host + ":" + connection_data.backend_port +'/deleteTask',{ data: { id: id }
      }).then(this.getTasks())
    }
    
    handleTaskChange(e){
      this.setState({newTask: e.target.value});
   }

   async markTask(id,isdone) {
    await axios.put(connection_data.backend_host + ":" + connection_data.backend_port +'/markDone', {
      id: id,
      isdone:isdone
    }).then(this.getTasks())
    }
    render() {
      return (
      <Container>
        <h1>TODO LIST</h1> 
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter new task" value={this.state.newTask} onChange={this.handleTaskChange}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.addTask}>
            Submit
          </Button>
        </Form>
          {this.state.tasks.map(task => <Task markTask={this.markTask} removeTask={this.removeTask} dataFromParent={task}></Task>)}
      </Container>
        );
    }
  }
  export default TodoList;