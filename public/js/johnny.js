var socket = io();
// THIS WILL BE USED TO RENDER ANY PROPERTY ON
//THE LEFT SIDE OF THE BODY
let pid = 0; // the key of the post id


const runEventListeners = () => {
    $(() => {
        setTimeout(() => {
            // function that will display the delete and edit button
            // for each post
            let dots = $(".menu-delete-activate");
            let menuDots = $(".menu-delete-container")
            let commentsDots = $(".display-delete-comment");
            let buttonDeleteComments = $(".trash-comment");
            let editPostDisplay;
            let currentMenu;
            let showTrashButton;

            $(document).mouseup((e) => {
                if (currentMenu) {
                    // let id = $(currentMenu).attr("id");
                    // console.log(e.target);
                    // console.log(id);
                    let insideDiv = false
                    if ($(currentMenu).children().eq(1)[0] === e.target) {
                        // console.log("this checks");
                        insideDiv = true;
                    }
                    if ($(currentMenu).children().eq(2)[0] === e.target) {
                        // console.log("this checks");
                        insideDiv = true;
                    }
                    if ($(currentMenu).children().eq(2).children().eq(0)[0] === e.target) {
                        // console.log("works kid");
                        insideDiv = true;
                    }
                    if ($(currentMenu).children().eq(2).children().eq(1)[0] === e.target) {
                        // console.log("works kid");
                        insideDiv = true;
                    }

                    if (insideDiv === false) {
                        // console.log("no longer there");
                        for (let menu of menuDots) {
                            $(menu).hide();
                        }
                        editPostDisplay.hide();
                        // clickTrack = 0;
                    }
                    // else {
                    //     clickTrack++;
                    // }
                }

            }
            )

            $(document).mouseup((e) => {
                if (showTrashButton) {
                    // console.log(showTrashButton);
                    // console.log(e.target)
                    if (e.target !== showTrashButton) {
                        $(showTrashButton).hide();
                    }
                }

            }
            )

            let showHideMenu = (event) => {
                for (let menu of menuDots) {
                    $(menu).hide();
                    // console.log(menu);
                }

                let menuContainer = $(`.menu-delete-container[id=${event.currentTarget.id}]`);
                currentMenu = menuContainer[0];
                let editBtn = menuContainer.children().eq(1);
                let editForm = menuContainer.children().eq(2);
                editPostDisplay = editForm;

                menuContainer.show();
                // console.log(event.currentTarget.id);

                editBtn.on("click", (editEvent) => {
                    editForm.show();
                    // console.log("clicked edit button");
                }
                )

            }

            let showDeleteOption = (event) => {
                // console.log("time to delete");
                // for (let button1 of buttonDeleteComments) {
                //     $(button1).hide();
                // }
                const buttonShow = $(`.trash-comment[id=${event.target.id}]`);
                // console.log(buttonShow.css("display"));
                showTrashButton = buttonShow[0];

                if (buttonShow.css("display") == "none") {
                    buttonShow.show();
                    // console.log("here one");
                } else {
                    buttonShow.hide();
                    // console.log("here3");
                }

            }

            for (let dot of dots) {
                $(dot).on('click', showHideMenu);
            }
            for (let delete1 of commentsDots) {
                $(delete1).on("click", showDeleteOption);
            }

            //  FUNCTIONT THAT WILL SHOW THE EDIT FORM

        }, 1000)
    });
}

class LeftBar extends React.Component {
    render = () => {
        return (
            <div className='left-main-bar'>
                <h1 className='test-title' data-target='try-bar'>
                    <i className='material-icons left-arrow'>double_arrow</i>
                </h1>
                <div className='edgar-js' id='try-bar'></div>

                <div className='buttons-auth'></div>
            </div>
        );
    };
}

// THIS WILL BE USED TO RENDER ANY PROPERTY ON
//THE RIGHT SIDE OF THE BODY
class RightBar extends React.Component {
    render = () => {
        return (
            <div className='right-main-bar'>
                <div className="project-logo">
                    <h1 className="project-name">CHISME</h1>
                </div>
                <div className="info-container">
                    <div className="info-1">
                        <a href="/"><i className="fab fa-facebook"></i></a>
                        <a href="/"><i className="fab fa-twitter"></i>
                        </a>
                        <a href="/"><i className="fab fa-instagram"></i></a>

                    </div>
                    <div className="info-2">
                        <a href="/">Contact Us</a>
                        <a href="/">How To Use</a>
                        <a href="/">About Us</a>
                    </div>
                    <div className="team">
                        <h6>Team Project by:</h6>
                        <ul>
                            <li className="contributor">
                                <a>
                                    <i className="fab fa-linkedin"></i>
                                Daniel
                                </a>
                            </li>
                            <li className="contributor">
                                <a>
                                    <i className="fab fa-linkedin"></i>
                                Edgar
                                </a>
                            </li>
                            <li className="contributor">
                                <a>
                                    <i className="fab fa-linkedin"></i>
                                Johnny
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };
}

class Comments extends React.Component {
    render = () => {
        return (
            <form
                className='new-comment-form'
                onSubmit={this.props.submitComment}
                id={this.props.postId}
            >
                {/* INPUT FOR THE COMMENT */}
                <textarea
                    className='comment-textarea'
                    id='text'
                    placeholder='write a comment'
                    onChange={this.props.onChangeComment}
                ></textarea>
                {/* SUBMIT BUTTON TO CREATE A NEW POST*/}
                <button type='submit' className='transparent comment-button'>
                    <i className='material-icons reply'>message</i>
                </button>
            </form>
        );
    };
}

// THIS WILL BE A CLASS TO RENDER ALL THE POSTS
// STORED IN THE POSTS ARRAY

class AllPosts extends React.Component {

    render = () => {


        return <div className="all-posts-container">
            <ul className="list-posts ">
                {this.props.postList.map((post) => {
                    return <li className="single-post" key={post._id}>
                        <div className="subject-body-container">
                            <h6 className="post-subject"> {post.subject}</h6>
                            <p className="post-body"> {post.body}</p>
                        </div>

                        <div className="menu-delete-activate" id={post._id}>
                            <span className="material-icons">
                                more_horiz
                            </span>
                        </div>
                        <div className="menu-delete-container" id={post._id}>
                            <button onClick={this.props.deleteAPost} id={post._id}><span className="material-icons">
                                delete
                                </span></button>
                            {/* FORM TO EDIT A POST */}
                            <span className="material-icons">edit</span>
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
                        </div>
                        {/* ==========EDGAR IS WORKING HERE!========== */}
                        <ul className="list-of-comments" id={post._id}>

                            {
                                post.comments.map((comment) => {
                                    return <li key={comment._id}
                                        className="single-comment">
                                        <p className="comment-text">
                                            {comment.text}
                                        </p>
                                        <span className="material-icons display-delete-comment" id={comment._id}>more_horiz</span>
                                        <button
                                            className="material-icons trash-comment"
                                            onClick={this.props.deleteAComment}
                                            id={comment._id}

                                            data-postid={post._id}>delete</button>
                                    </li>
                                }
                                )
                            }
                        </ul>
                        <Comments
                            onChangeComment={this.props.handleCommentChange}
                            submitComment={this.props.submitNComment}
                            postId={post._id}
                        />
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
        user: undefined,
        subject: undefined,
        body: undefined,
        comments: undefined,
        posts: [],
        socketId: "",
    };
    // THIS WILL BE TRIGGER EVERYTIME THE
    // PAGE LOADS AND WILL HELP TO POPULATE
    // THE POSTS IN AN ARRAY FOR LATER TO BE
    // DISPLAYED
    componentDidMount = () => {
        axios.get("/posts").then((response) => {
            this.setState({
                posts: response.data,
            });
        });
        //========== EDGAR'S SOCKET RECEPTION LINE ==========
        console.log(pid + "THIS BE DA ID");
        socket.on("chatid", function (stuff) {
            console.log("I am here pt 2: " + stuff.msg);
            // console.log($(`ul[id=${stuff.pid2}]`))
            let myParent = $(`ul[id=${stuff.pid2}]`);
            let child1 = $('<li class="single-comment">').text(stuff.msg);
            let button = $("<button>").text("Remove Comment");
            let child2 = $("<details>").append(button);
            child1.append(child2);
            myParent.append(child1);
        });
        runEventListeners();
    };

    // THIS WILL SEND A NEW POST TO THE BACK END
    // TO BE SAVED IN THE DATABASE
    submitPost = (event) => {
        event.preventDefault();
        event.currentTarget.reset();

        //MAKING AN ASYNC CALL?
        axios.post("/posts", this.state).then((response) => {
            this.setState({
                posts: response.data,
            });
        });
        runEventListeners();
    };

    //THIS IS A FUNCTION THAT WILL POPULATE
    // THE KEY WITH A VALUE
    // THE KEY HAS TO MATCH THE PROPERTIES IN
    // STATE SO IT CAN BE SAVED ONCE THE USER
    // CREATES A NEW POST
    //Edgar's edit, this is also creating new keys for comments even though they don't exist in state
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    // THIS IS A FUNCTION THAT WILL DELETE A SINGLE POST
    // BY TARGETING ITS ID AND THEN WILL GET THE
    // NEW DATA BACK TO RE-POPULATE THE LIST OF POSTS
    // AND RENDER IT
    deletePost = (event) => {
        const id = event.currentTarget.id;
        console.log(id);
        console.log(event.currentTarget);
        axios.delete("/posts/" + id).then((response) => {
            this.setState({
                posts: response.data,
            });
        });
        runEventListeners();
    };

    // THIS IS A FUNCTION THAT WILL EDIT A SINGLE POST
    // BY TARGETING ITS ID AND WILL GET THE NEW DATA
    // BACK TO RE-POPULATE THE LIST OF POSTS AND RENDER IT
    editPost = (event) => {
        event.preventDefault();
        const id = event.target.id;
        console.log(this.state);
        axios.patch(`/posts/${id}`, this.state).then((response) => {
            console.log(response.data);
            this.setState({
                user: undefined,
                subject: undefined,
                body: undefined,
                // comments: [],
                posts: response.data,
            });
        });
        runEventListeners();
    };

    // A FUNCTION THAT WILL CREATE A NEW COMMENT
    //========== EDGAR'S SOCKET SUBMISSION LINE ==========
    SubmitComment = (event) => {
        event.preventDefault();

        event.currentTarget.reset();
        const id = event.target.id;
        axios.post("/posts/" + id + "/comment", this.state).then((response) => {
            // console.log(response);
            this.setState({
                socketId: response.data[response.data.length - 1]._id,
            });
            pid = this.state.socketId;
            // console.log(this.state.socketId);
        });

        // console.log(event.target)
        pid = $(event.target).parent().children().eq(2).attr("id");
        let pid2 = pid;

        console.log(this.state.text); // edgar testing
        var msg = this.state.text; //the msg being transerred to socket id
        console.log(msg);
        socket.emit("test", { msg, pid2 }); // socket sending msg + the id of the particular post
        runEventListeners();
    };

    // A FUNCTION THAT WILL DELETE A SINGLE COMMENT
    deleteComment = (event) => {
        console.log(event.target);
        const id = event.target.id;
        const postId = event.target.getAttribute("data-postid");
        console.log(`${id} + ${postId}`);
        axios.delete("/posts/comment/" + id).then((response) => {
            this.setState({
                posts: response.data,
            });
            // console.log(response);
        });
    };
    // CREATING THE FORM TO BE RENDERED IN THE INDEX
    // AND ADDING THE FUNCTIONS ABOVE
    render = () => {
        return (
            <div className='add-new-post'>
                <form className='new-post-form' onSubmit={this.submitPost}>
                    {/* INPUT FOR THE SUBJECT */}
                    <input
                        type='text'
                        id='subject'
                        placeholder='subject'
                        onChange={this.handleChange}
                    />
                    {/* INPUT FOR THE BODY */}
                    <textarea
                        id='body'
                        placeholder='write a post'
                        onChange={this.handleChange}
                    ></textarea>
                    {/* SUBMIT BUTTON TO CREATE A NEW POST*/}
                    <input type='submit' value='Create Post' />
                </form>

                <AllPosts
                    postList={this.state.posts}
                    deleteAPost={this.deletePost}
                    handle={this.handleChange}
                    editAPost={this.editPost}
                    submitNComment={this.SubmitComment}
                    handleCommentChange={this.handleChange}
                    deleteAComment={this.deleteComment}
                />
            </div>
        );
    };
}

// ======== CONTAINS ALL THE OTHER CLASSES IN A SIGLE MAIN CLASS==
// this is what gets sent to the ReactDOM.render();
class App extends React.Component {
    render = () => {
        return (
            <div className='main-body'>
                <LeftBar />
                <div className='middle-bar'>
                    <PostForm />
                </div>
                <RightBar />
            </div>
        );
    };
}

ReactDOM.render(<App />, document.querySelector("#root"));
