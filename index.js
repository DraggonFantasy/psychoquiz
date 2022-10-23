var activeQuestion = 0;
var sex = undefined;

function setSex(s) {
    sex = s;
    next();
}

function answer(a) {
    next()
}

function answerArange() {
    next()
}

function answerInput() {
    document.getElementById("input_answer").value = null;
    next()
}

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

function next() {
    activeQuestion += 1;
    update()
}

function update() {
    function activate(id) {
        active = document.querySelector(".activated-question");
        if(active) active.classList.remove("activated-question");
        document.getElementById(id).classList.add("activated-question");
    }

    if(activeQuestion == null) {
        activeQuestion = 0;
    }
    if(activeQuestion >= questions.length) {
        // TODO
        return
    }
    let qtype = questions[activeQuestion].type;
    let arg1 = questions[activeQuestion].arg1;
    let arg2 = questions[activeQuestion].arg2;
    console.log("qtype", qtype)
    document.getElementById("question_number").innerText = `${activeQuestion+1}/${questions.length}`
    switch (qtype) {
        case "intro":
            activate("q_intro")
            break;
        case "sex":
            activate("q_sex")
            break;
        case "yesno":
            document.getElementById("yesno_question").innerText = arg1;
            activate("q_yesno")
            break;
        case "agree":
            document.getElementById("agree_question").innerText = arg1;
            activate("q_agree")
            break;
        case "input":
            document.getElementById("input_question").innerText = arg1;
            activate("q_input")
            break;
        case "methodic":
            document.getElementById("methodic_name").innerText = arg1;
            document.getElementById("methodic_instruction").innerText = arg2;
            activate("q_methodic")
            break;
        case "arange":
            createArangeOptions(arg1-1)
            activate("q_arange")
            break;
        case "choice":
            document.getElementById("choice_with_custom_question").innerText = arg1;
            var el = document.getElementById("q_choice_with_custom")
            var wrapper = el.querySelector(".wrapper")
            var choices = arg2;
            while(wrapper.hasChildNodes()) wrapper.removeChild(wrapper.firstChild);
            for(const choice of arg2) {
                const btn = document.createElement("button")
                btn.classList.add("answer-option")
                btn.onclick = () => answer(choice)
                btn.innerText = choice
                wrapper.appendChild(btn)
            }
            activate("q_choice_with_custom")
            break;
        case "choiceWithCustom":
            document.getElementById("choice_with_custom_question").innerText = arg1;
            var el = document.getElementById("q_choice_with_custom")
            var wrapper = el.querySelector(".wrapper")
            var choices = arg2;
            while(wrapper.hasChildNodes()) wrapper.removeChild(wrapper.firstChild);
            for(const choice of arg2) {
                const btn = document.createElement("button")
                btn.classList.add("answer-option")
                btn.onclick = () => answer(choice)
                btn.innerText = choice
                wrapper.appendChild(btn)
            }
            let btn = document.createElement("button")
            btn.classList.add("answer-option")
            btn.onclick = () => {
                const res = prompt("Введіть ваш варіант")
                answer(res)
            }
            btn.innerText = "Свій варіант"
            wrapper.appendChild(btn)
            activate("q_choice_with_custom")
            break;
        case "outro":
            activate("q_outro")
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

setTimeout(update, 100)