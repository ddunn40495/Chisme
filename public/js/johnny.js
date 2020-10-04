
var socket = io();
// THIS WILL BE USED TO RENDER ANY PROPERTY ON
//THE LEFT SIDE OF THE BODY
class LeftBar extends React.Component {

    render = () => {
        return <div className="left-main-bar">
            <h1>Left Bar</h1>
            <div className="edgar-js">

            </div>
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


class Comments extends React.Component {

    render = () => {
        return <form className="new-comment-form" onSubmit={this.props.submitComment} id={this.props.postId}>
            {/* INPUT FOR THE COMMENT */}
            <textarea
                className="comment-textarea"
                id="text"
                placeholder="write a comment"
                onChange={this.props.onChangeComment}></textarea>
            {/* SUBMIT BUTTON TO CREATE A NEW POST*/}
            <input type="submit" value="Send" />
        </form>
    }
}




// THIS WILL BE A CLASS TO RENDER ALL THE POSTS
// STORED IN THE POSTS ARRAY

class AllPosts extends React.Component {




    render = () => {


        return <div className="all-posts-container">
            <ul className="list-posts ">
                {this.props.postList.map((post) => {
                    return <li className="single-post" key={post._id}>
                        <h6 className="post-subject">subject: {post.subject}</h6>
                        <p className="post-body">body: {post.body}</p>

                        <details className="menu-delete-edit">

                            <summary></summary>
                            <button onClick={this.props.deleteAPost} id={post._id}>Delete Post</button>
                            <details>
                                <summary>Edit Post</summary>
                                {/* FORM TO EDIT A POST */}
                                <form className="edit-post-form" onSubmit={this.props.editAPost} id={post._id}>
                                    {/* INPUT FOR THE SUBJECT */}
                                    <input
                                        type="text"
                                        id="subject"
                                        defaultValue={post.subject}
                                        onChange={this.props.handle} />
                                    {/* INPUT FOR THE BODY */}
                                    <textarea
                                        id="body"
                                        defaultValue={post.body}
                                        onChange={this.props.handle}></textarea>
                                    {/* SUBMIT BUTTON TO CREATE A NEW POST*/}
                                    <input type="submit" value="Edit Post" />
                                </form>
                            </details>
                        </details>
                        {/* ==========EDGAR IS WORKING HERE!========== */}
                        <ul className="list-of-comments">
                            <Comments
                                onChangeComment={this.props.handleCommentChange}
                                submitComment={this.props.submitNComment}
                                postId={post._id}
                            />
                            {
                                post.comments.map((comment) => {
                                    return <li key={comment._id}
                                        className="single-comment">
                                        {comment.text}
                                    </li>
                                }
                                )
                            }
                        </ul>
                    </li>
                }
                )}
            </ul>
        </div>
    }

}

// document.addEventListener('DOMContentLoaded', function () {
//     var elems = document.querySelectorAll('.collapsible');
//     var instances = M.Collapsible.init(elems, options);
// });


// ====== THIS FORM IS TO CREATE A NEW POST====
//  THIS WILL RENDER IN THE MIDDLE OF THE MAIN PAGE
class PostForm extends React.Component {

    // ADDING KEYS THAT WILL BE USED FOR THE FORM
    //AND ADDING AN ARRAY TAHT WILL STORE ALL THE
    //POSTS
    state = {
        user: "",
        subject: "",
        body: "",
        comments: [],
        posts: [],
        socketId: ""
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
        //========== EDGAR'S SOCKET RECEPTION LINE ==========

        var pid = this.state.socketId // the key of the post id
        socket.on('chatid', function(msg){
            // console.log("I am here")
            $(`[key=${pid}]`).append($('<li class="single-comment">').text(msg));
        })
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


    //THIS IS A FUNCTION THAT WILL POPULATE
    // THE KEY WITH A VALUE
    // THE KEY HAS TO MATCH THE PROPERTIES IN
    // STATE SO IT CAN BE SAVED ONCE THE USER
    // CREATES A NEW POST
    //Edgar's edit, this is also creating new keys for comments even though they don't exist in state
    handleChange = event => {
        console.log("user is typing...")
        console.log(event.target.id)
        console.log(event.target.value)
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    // THIS IS A FUNCTION THAT WILL DELETE A SINGLE POST
    // BY TARGETING ITS ID AND THEN WILL GET THE 
    // NEW DATA BACK TO RE-POPULATE THE LIST OF POSTS
    // AND RENDER IT
    deletePost = (event) => {
        const id = event.target.id;
        axios.delete("/posts/" + id).then(
            (response) => {
                this.setState({
                    posts: response.data
                })
            }
        )
    }

    // THIS IS A FUNCTION THAT WILL EDIT A SINGLE POST
    // BY TARGETING ITS ID AND WILL GET THE NEW DATA
    // BACK TO RE-POPULATE THE LIST OF POSTS AND RENDER IT
    editPost = (event) => {
        event.preventDefault();
        const id = event.target.id;
        console.log(this.state)
        axios.put(`/posts/${id}`, this.state).then(
            (response) => {
                this.setState({
                    posts: response.data,
                })
            }
        )
    }


    // A FUNCTION THAT WILL CREATE A NEW COMMENT
    //========== EDGAR'S SOCKET SUBMISSION LINE ==========
    SubmitComment = (event) => {
        event.preventDefault();

        console.log(this.state.text) // edgar testing
        var msg = this.state.text //the msg being transerred to socket id
        console.log(msg)
        socket.emit('test', msg); // socket sending msg

        event.currentTarget.reset();
        const id = event.target.id;
        axios.post("/posts/" + id + "/comment", this.state).then(
            (response) => {
                console.log(response)
                this.setState({
                    socketId: response.data[response.data.length -1]._id,
                })
                console.log(this.state.socketId)
            }
        )
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
                deleteAPost={this.deletePost}
                handle={this.handleChange}
                editAPost={this.editPost}
                submitNComment={this.SubmitComment}
                handleCommentChange={this.handleChange}
            />

        </div>
    }

}

// ======== CONTAINS ALL THE OTHER CLASSES IN A SIGLE MAIN CLASS==
// this is what gets send to the ReactDOM.render();
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