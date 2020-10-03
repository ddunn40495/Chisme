// const { set } = require("mongoose");

var socket = io();
class Edgar extends React.Component {
    state = {
      // socket: io()
      newMessage: ""
    };
    componentDidMount = () =>{
      socket.on('chatid', function(msg){
        console.log("I am here")
        $('#messages').append($('<div class="msg">').text(msg));
      })
    }
    handleChange= (event) =>{
      this.setState({
        [event.target.id]: event.target.value
      })
    }
    sendMessage = (e) =>{
      e.preventDefault(); // prevents page reloading
      socket.emit('test', $('#m').val());
      e.currentTarget.reset();
    }
    updateMessage = (nm) =>{
      this.setState({
        newMessage: nm
      })
    }
    render = () => {
      return <div id="edgars-main-div">
        <div id="messages">
        {this.state.newMessage}
        </div>
        <form onSubmit={this.sendMessage}>
          <input type="text" id="m" onChange={this.handleChange}/>
          <input type="submit"/>
        </form>
      </div>;
    };
  }
  
  ReactDOM.render(<Edgar />, document.querySelector(".edgar-js"));
  
