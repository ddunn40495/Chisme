

// THIS WILL BE USED TO RENDER ANY PROPERTY ON
//THE LEFT SIDE OF THE BODY
class LeftBar extends React.Component {

    render = () => {
        return <div className="left-main-bar">
            <h1>Left Bar</h1>
        </div>
    }

}


// THIS WILL BE USED TO RENDER ANY PROPERTY ON
//THE RIGHT SIDE OF THE BODY
class RightBar extends React.Component {

    render = () => {
        return <div className="right-main-bar">
            <h1>Right Bar</h1>
        </div>
    }
}


// THIS WILL BE A CLASS TO RENDER ALL THE POSTS
// STORED IN THE POSTS ARRAY

class AllPosts extends React.Component {


    render = () => {
        return <div className="all-posts-container">
            <ul className="list-posts">
                {this.props.postList.map((post) => {
                    return <li className="single-post" key={post._id}>
                        <h6 className="post-subject">subject: {post.subject}</h6>
                        <p className="post-body">body: {post.body}</p>
                    </li>
                }
                )}
            </ul>
        </div>
    }

}



// ====== THIS FORM IS TO CREATE A NEW POST====
//  THIS WILL RENDER IN THE MIDDLE OF THE MAIN PAGE
class PostForm extends React.Component {

    // ADDING KEYS THAT WILL BE USED FOR THE FORM
    //AND ADDING AN ARRAY TAHT WILL STORE ALL THE
    //POSTS
    state = {
        user: "5f762749417ba037396912b0",
        subject: "",
        body: "",
        comments: [],
        posts: [],
    }

    // THIS WILL BE TRIGGER EVERYTIME THE
    // PAGE LOADS AND WILL HELP TO POPULATE
    // THE POSTS IN AN ARRAY FOR LATER TO BE
    // DISPLAYED
    componentDidMount = () => {
        axios.get("/posts").then(
            (response) => {
                this.setState({
                    posts: response.data,
                })
            }
        )
    }


    // THIS WILL SEND A NEW POST TO THE BACK END
    // TO BE SAVED IN THE DATABASE
    submitPost = (event) => {
        event.preventDefault();
        event.currentTarget.reset();

        //MAKING AN ASYNC CALL?
        axios.post("/posts", this.state).then(
            (response) => {
                this.setState({
                    posts: response.data,
                })
            }
        )
    }


    //THIS IS A FUNCTION THAT WILL PUPULATE
    // THE KEY WITH A VALUE
    // THE KEY HAS TO MATCH THE PROPERTIES IN
    // STATE SO IT CAN BE SAVED ONCE THE USER
    // CREATES A NEW POST
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // CREATING THE FORM TO BE RENDERED IN THE INDEX
    // AND ADDING THE FUNCTIONS ABOVE
    render = () => {
        return <div className="add-new-post">
            <form className="new-post-form" onSubmit={this.submitPost}>
                {/* INPUT FOR THE SUBJECT */}
                <input
                    type="text"
                    id="subject"
                    placeholder="subject"
                    onChange={this.handleChange} />
                {/* INPUT FOR THE BODY */}
                <textarea
                    id="body"
                    placeholder="write a post"
                    onChange={this.handleChange}></textarea>
                {/* SUBMIT BUTTON TO CREATE A NEW POST*/}
                <input type="submit" value="Create Post" />
            </form>

            <AllPosts
                postList={this.state.posts}
            />

        </div>
    }

}

// ======== CONTAINS ALL THE OTHER CLASSES IN A SIGLE MAIN CLASS==
class App extends React.Component {
    render = () => {
        return <div className="main-body">
            <LeftBar />
            <div className="middle-bar" >
                <h1>Main body</h1>
                <PostForm />
            </div>
            <RightBar />
        </div>
    };
}


ReactDOM.render(
    <App />,
    document.querySelector("#root")
)