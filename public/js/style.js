
const title = $(".test-title");
const arrow = $(".left-arrow");
const bar = $(".left-main-bar");

const expand = (event) => {
    bar.toggleClass("expand");
    arrow.toggleClass("flip-arrow");
    title.toggleClass("change-color");
}

title.on('click', expand);

const authButtons = $(".auth-button");

const sendMessage = (event) => {
    alert("This is currently under development\n" +
        "\t Thank you for your patience");
}

for (let button of authButtons) {
    $(button).on("click", sendMessage);
}


// adding functionality to menu button for a post
// $(() => {
//     //jQuery code goes here
//     setTimeout(() => {
//         const dots = $(".menu-delete-activate");
//         console.log(dots);
//         const showHideMenu = (event) => {
//             const menuContainer = $(`.menu-delete-container[id=${event.currentTarget.id}]`);
//             menuContainer.toggle();
//             console.log(event.currentTarget.id);
//         }
//         dots.on('click', showHideMenu);
//     }, 1000);
// });








// $('document').ready(function () {
//     const dots = $("button");
//     const menuContainer = $(".menu-delete-container");
//     console.log(dots)
//     // console.log(menuContainer);
//     const showHideMenu = (event) => {
//         menuContainer.toggle();
//         console.log("Hellooooo");
//     }
//     console.log($(".menu-delete-container"))
// });










// GARBAGE CODE!!!!!!!!!!!!!!!! NEVER WORKED!!!
// const leftMainBar = document.querySelector(".left-main-bar");
// const expand = (event) => {
//     leftMainBar.style.width = "250px";
//     $(event.currentTarget).on("click", (event) => {
//         leftMainBar.style.width = "150px"

//     }
//     )
//     $(".left-main-bar").toggleClass("expand");
// }
// windonw.document.querySelector(".test-title").addEventListener("click", expand);