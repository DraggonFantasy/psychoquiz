var userId = window.localStorage.getItem("userId")
if(userId == null) {
    userId = makeid(8);
}
window.localStorage.setItem("userId", userId);

var activeQuestion = parseInt(window.localStorage.getItem("activeQuestion")) || 0;
var sex = undefined;
sex = window.localStorage.getItem("sex")
var userAnswers = {}
userAnswers = JSON.parse(window.localStorage.getItem("userAnswers")) || {}

var globalAnswerTable = {}
globalAnswerTable = JSON.parse(window.localStorage.getItem("globalAnswersTable")) || {};

function setSex(s) {
    sex = s;

    document.getElementById("agree_yes").innerText = sex === "male" ? "Згоден" : "Згодна"
    document.getElementById("agree_no").innerText = sex === "male" ? "Не згоден" : "Не згодна"

    next();
}

function answerYesNo(a) {
    if(activeQuestion != null && questions[activeQuestion].type === "yesno") {
        const group = questions[activeQuestion].group;
        const key = document.getElementById("yesno_question").innerHTML;
        userAnswers[group][key] = a;
        console.log(`Updated inputAnswers[${key}]`, userAnswers)
    }
    next()
}

function answerAgree(a) {
    if(activeQuestion != null && questions[activeQuestion].type === "agree") {
        const group = questions[activeQuestion].group;
        const key = document.getElementById("agree_question").innerHTML;
        userAnswers[group][key] = a;
        console.log(`Updated inputAnswers[${key}]`, userAnswers)
    }
    next()
}

function answerChoice(a) {
    if(activeQuestion != null && (questions[activeQuestion].type === "choice" || questions[activeQuestion].type === "choiceWithCustom")) {
        const group = questions[activeQuestion].group;
        const key = document.getElementById("choice_with_custom_question").innerHTML;
        userAnswers[group][key] = a;
        console.log(`Updated inputAnswers[${key}]`, userAnswers)
    }
    next()

}

function answerArange() {
    next()
}

function answerInput() {
    if(activeQuestion != null && questions[activeQuestion].type === "input") {
        const group = questions[activeQuestion].group;
        const key = document.getElementById("input_question").innerHTML;
        userAnswers[group][key] = document.getElementById("input_answer").value;
        console.log(`Updated inputAnswers[${key}]`, userAnswers)
    }
    next()
}

const saveToCloud = () => {
    // const url = "https://europe-central2-silicon-reason-366309.cloudfunctions.net/psychoquiz";

    var arangeToStore = {}
    if(window.localStorage.getItem("storeArangeOptions0") === "1") {
        for (const [i, v] of Object.entries(arangeOptions[0])) {
            arangeToStore[v] = parseInt(i) + 1
        }
    }
    if(window.localStorage.getItem("storeArangeOptions1") === "1") {
        for (const [i, v] of Object.entries(arangeOptions[1])) {
            arangeToStore[v] = parseInt(i) + 1
        }
    }

    // var answersToStore = {
    //     "Стать": sex,
    //     "Пройдено питань": activeQuestion,
    //     "Відповіді": userAnswers,
    //     "Рокич": arangeToStore,
    // }

    // fetch(url, {
    //     method : "POST",
    //     body: JSON.stringify({
    //         "userId": userId,
    //         ...answersToStore
    //     })
    // })

    globalAnswerTable[userId] = {
        "Стать": sex,
        "Пройдено питань": activeQuestion,
        "Відповіді": userAnswers,
        "Рокич": arangeToStore
    }
}

function next() {
    console.log("NEXT")
    activeQuestion += 1;
    update()
}

function back() {
    console.log("BACK")
    if(activeQuestion && questions[activeQuestion].type === "input") {
        const group = questions[activeQuestion].group;
        const key = document.getElementById("input_question").innerHTML;
        userAnswers[group][key] = document.getElementById("input_answer").value;
        console.log(`Updated inputAnswers[${key}]`, userAnswers)

    }
    if(activeQuestion > 0) {
        activeQuestion -= 1;
        update()
    }
}

function reset() {
    activeQuestion = 0;
    sex = undefined;
    userAnswers = {};
    arangeOptions = defaultArangeOptions;
    userId = makeid(8);

    window.localStorage.setItem("sex", sex)
    window.localStorage.setItem("activeQuestion", activeQuestion)
    window.localStorage.setItem("userAnswers", JSON.stringify(userAnswers))
    window.localStorage.setItem("arangeOptions", JSON.stringify(arangeOptions))
    window.localStorage.setItem("userId", userId);
    window.localStorage.removeItem("storeArangeOptions0")
    window.localStorage.removeItem("storeArangeOptions1")

    update()
}

function downloadAnswers() {
    var data = JSON.stringify(globalAnswerTable, null, 4);
    var a = document.createElement('a');
    var blob = new Blob([data], {'type':'application/json'});
    a.href = window.URL.createObjectURL(blob);
    a.download = "data.json";
    a.click();
}

function update() {
    window.localStorage.setItem("userId", userId);
    window.localStorage.setItem("sex", sex)
    window.localStorage.setItem("activeQuestion", activeQuestion)
    window.localStorage.setItem("userAnswers", JSON.stringify(userAnswers))
    window.localStorage.setItem("arangeOptions", JSON.stringify(arangeOptions))
    window.localStorage.setItem("globalAnswersTable", JSON.stringify(globalAnswerTable))

    let dbtn = document.getElementById("downloadbtn")
    if(dbtn) dbtn.innerText = `Скачати відповіді (${Object.keys(globalAnswerTable).length})`

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
    let group = questions[activeQuestion].group;
    let arg1 = questions[activeQuestion].arg1;
    let arg2 = questions[activeQuestion].arg2;
    if(group && !userAnswers[group])
        userAnswers[group] = {}
    if(arg1 && arg1[sex]) {
        arg1 = arg1[sex]
    }
    if(arg2 && arg2[sex]) {
        arg2 = arg2[sex]
    }
    console.log("qtype", qtype)
    document.getElementById("question_number").innerHTML = `${activeQuestion+1}/${questions.length}`
    switch (qtype) {
        case "intro":
            activate("q_intro")
            break;
        case "sex":
            activate("q_sex")
            break;
        case "yesno":
            document.getElementById("yesno_question").innerHTML = arg1;
            activate("q_yesno")
            break;
        case "agree":
            document.getElementById("agree_question").innerHTML = arg1;
            activate("q_agree")
            break;
        case "input":
            document.getElementById("input_question").innerHTML = arg1;
            document.getElementById("input_answer").value = userAnswers[group][arg1] || "";
            console.log(`inputAnswers[${arg1}] = `, userAnswers[group][arg1], userAnswers[group][arg1] || "")
            activate("q_input")
            break;
        case "methodic":
            document.getElementById("methodic_name").innerHTML = arg1;
            document.getElementById("methodic_instruction").innerHTML = arg2;
            activate("q_methodic")
            break;
        case "arange":
            createArangeOptions(arg1-1)
            activate("q_arange")
            break;
        case "choice":
            document.getElementById("choice_with_custom_question").innerHTML = arg1;
            var el = document.getElementById("q_choice_with_custom")
            var wrapper = el.querySelector(".wrapper")
            var choices = arg2;
            while(wrapper.hasChildNodes()) wrapper.removeChild(wrapper.firstChild);
            for(const choice of arg2) {
                const btn = document.createElement("button")
                btn.classList.add("answer-option")
                btn.onclick = () => answerChoice(choice)
                btn.innerText = choice
                wrapper.appendChild(btn)
            }
            activate("q_choice_with_custom")
            break;
        case "choiceWithCustom":
            document.getElementById("choice_with_custom_question").innerHTML = arg1;
            var el = document.getElementById("q_choice_with_custom")
            var wrapper = el.querySelector(".wrapper")
            var choices = arg2;
            while(wrapper.hasChildNodes()) wrapper.removeChild(wrapper.firstChild);
            for(const choice of arg2) {
                const btn = document.createElement("button")
                btn.classList.add("answer-option")
                btn.onclick = () => answerChoice(choice)
                btn.innerText = choice
                wrapper.appendChild(btn)
            }
            let btn = document.createElement("button")
            btn.classList.add("answer-option")
            btn.onclick = () => {
                const res = prompt("Введіть ваш варіант")
                answerChoice(res)
            }
            btn.innerText = "Свій варіант"
            wrapper.appendChild(btn)
            activate("q_choice_with_custom")
            break;
        case "outro":
            activate("q_outro")
            break;
    }

    setTimeout(saveToCloud, 10)
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