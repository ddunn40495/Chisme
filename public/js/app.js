class App extends React.Component {
  state = {};
  logRed = () => {
    console.log("it  is red");
  };
  render = () => {
    return <h3 onClick={this.logRed}>red</h3>;
  };
}

ReactDOM.render(<App />, document.querySelector("#root"));
