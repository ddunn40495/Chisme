
class LeftBar extends React.Component {


    render = () => {
        return <div className="left-main-bar">
            <h1>Left Bar</h1>
        </div>
    }

}

class RightBar extends React.Component {

    render = () => {
        return <div className="right-main-bar">
            <h1>Right Bar</h1>
        </div>
    }
}


class App extends React.Component {


    render = () => {
        return <div className="main-body">
            <LeftBar />
            <div className="middle-bar">
                <h1>Main body</h1>
                <div className="add-new-post">
                    <form>

                    </form>
                </div>
            </div>
            <RightBar />
        </div>
    };

}


ReactDOM.render(
    <App />,
    document.querySelector("#root")
)