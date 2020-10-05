class App extends React.Component {
  state = {};

  logInFuction = () => {
    console.log("you cliked the LOG IN button");
  }
  logOutFunction = () => {
    console.log("you cliked the LOG OUT button");
  }
  signUpFunction = () => {
    console.log("you cliked the SIGN UP button");
  }




  render = () => {
    return <div className="user-functionality">
      {/* CREATING BUTTONS FOR USER AUTHENTICATION */}
      <button
        className="log-in auth-button"
        onClick={this.logInFuction}
      >LOG IN</button>
      <button
        className="sign-up auth-button"
        onClick={this.signUpFunction}
      >SIGN UP</button>
      <button
        className="log-out auth-button"
        onClick={this.logOutFunction}
      >LOG OUT</button>

    </div>;
  };
}

ReactDOM.render(<App />, document.querySelector(".buttons-auth"));
