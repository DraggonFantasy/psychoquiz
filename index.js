
const test = () => {
    const url = "https://europe-central2-silicon-reason-366309.cloudfunctions.net/psychoquiz";
    fetch(url, {
        method : "POST",
        body: JSON.stringify({
            "message": "Hello my friend"
        })
    }).then(
        response => response.json()
    ).then(
        json => console.log(json)
    );
}

var activeQuestion = null;
setTimeout(() => {
    activeQuestion = questions[0];
    update()
}, 1)

function update() {
    let qtype = activeQuestion.type;
    switch (qtype) {
        case "yesno":
            break;
        case "custom":
            break;
    }
}

function onDrag(e) {
    e.dataTransfer.setData("text", e.target.id);
}
function onDrop(e) {
    e.preventDefault()
    const id = e.dataTransfer.getData("text");
    const draggedText = document.getElementById(id).innerText;
    const myText = e.target.innerText;
    e.target.innerText = draggedText;
    e.target.classList.remove("todrop")
    document.getElementById(id).innerText = myText;
    // alert(e.dataTransfer.getData("text"))
    // e.dataTransfer.setData("text", e.target.innerText);
}

function allowDrop(e) {
    e.preventDefault()
    e.target.classList.add("todrop")
}

function allowDropEnd(e) {
    e.target.classList.remove("todrop")
}
