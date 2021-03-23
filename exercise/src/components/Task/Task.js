import {Row, Button,OverlayTrigger} from 'react-bootstrap'
import React from 'react'

class Task extends React.Component {
    constructor() {
        super()
        this.state = {
            "task":"",
            "isDone":undefined,
            "id":undefined,
            "showRemove":false
        }
        this.renderButton = this.renderButton.bind(this)
    }

    componentDidMount() {
        this.setState({task:this.props.dataFromParent.task})
        this.setState({isDone:this.props.dataFromParent.isdone})
        this.setState({id:this.props.dataFromParent.id})
        setInterval(()=> {this.setState({task:this.props.dataFromParent.task})
        this.setState({isDone:this.props.dataFromParent.isdone})
        this.setState({id:this.props.dataFromParent.id})}, 1000)
    }

    renderButton = (props) => (
        <Button variant="danger" id="button-tooltip" {...props} onClick={() => this.props.removeTask(this.state.id)}>
          Remove
        </Button>
      );

    render() {
      return (
          <Row style={{display: 'flex', justifyContent: 'center'}}>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderButton}
            >
              <h1 onClick={() => this.props.markTask(this.state.id,this.state.isDone)}>{this.state.task} {this.state.isDone && "✔" }</h1>
            </OverlayTrigger>
          </Row>
      );
    }
  }

  export default Task;