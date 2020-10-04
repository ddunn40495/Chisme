
const title = $(".test-title");
const arrow = $(".left-arrow");
const bar = $(".left-main-bar");

const expand = (event) => {
    bar.toggleClass("expand");
    arrow.toggleClass("flip-arrow");
    title.toggleClass("change-color");
}

title.on('click', expand);


// fixing the button horrible on click color













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