
  class Login extends React.Component{
    // state = {
    //   username: "",
    //   password: ""
    // }
    handleChange= (event) =>{
      this.setState({
        [event.target.id]: event.target.value
      })
    }
    submitCreds = (event) =>{
      console.log("we are submitting creds")
    }
    render = () =>{
      <form action="/sessions" method="POST">
        <label for="name">User Name:</label>
        <input type="text" name="username" required/>
        <label for="color">Password:</label>
        <input type="password" name="password" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    }
  }

  class Signup extends React.Component{
    // state = {
    //   username: "",
    //   password: "",
    //   confirmPW: ""
    // }
    handleChange= (event) =>{
      this.setState({
        [event.target.id]: event.target.value
      })
    }
    submitCreds = (event) =>{
      console.log("we are submitting creds")
    }
    render = () =>{
      <form action="/users" method="POST">
        <label for="name">User Name:</label>
        <input type="text" name="username" required/>
        <label for="color">Password:</label>
        <input type="password" name="password" />
        {/* <label for="confirmPW">Confirm Password</label>
        <input type="password" name="confirmPW"/> */}
        <br />
        <input type="submit" value="Submit" />
      </form>
    }
  }
  

class Edgar extends React.Component {
    state = {
      currently: 0 // 0 = not logged in ; 1 = log in ; 2 = signing up; 3 = log out
    };
    ComponentDidMount = () =>{
      // this.setState({
      //   currently: 0
      // });
    }
    // run = () =>{
      // switch(this.state.currently){
      //   case 0: return (
      //     <div>
      //       <button className="log-in auth-button" onClick={this.updateCurrently(1)}>LOG IN</button>
      //       <button className="sign-up auth-button" onClick={this.updateCurrently(2)}>SIGN UP</button>
      //       <button className="log-out auth-button" onClick={this.updateCurrently(0)}>LOG OUT</button>
      //     </div>)
      //   case 1: return <Login></Login>
      //   case 2: return <Signup></Signup>
      // }
    // }
    handleChange= (event) =>{
      this.setState({
        // [event.target.id]: event.target.value
      })
    }
    updateCurrently = (x) =>{
      this.setState({
        currently: x
      })
    }
    render = () => {
      return <div id="edgars-main-div">
            {/* <button className="log-in auth-button" onClick={this.updateCurrently(1)}>LOG IN</button>
            <button className="sign-up auth-button" onClick={this.updateCurrently(2)}>SIGN UP</button>
            <button className="log-out auth-button" onClick={this.updateCurrently(0)}>LOG OUT</button> */}
      </div>;
    };
  }

  ReactDOM.render(<Edgar />, document.querySelector(".edgar-js"));
  
