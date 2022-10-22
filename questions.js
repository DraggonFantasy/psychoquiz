function q(qtype) {

}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createArangeOptions() {
    const q_arange = document.getElementById("q_arange_options");
    const option = q_arange.querySelector(".arange-option");
    console.log(option)
    for(const o of [
        "активна діяльна життя (повнота та емоційна насиченість життя);",
        "життєва мудрість (зрілість суджень і здоровий глузд, що досягаються життєвим досвідом);",
        "здоров'я (фізичне і психічне);",
        "цікава робота;",
        "краса природи і мистецтва (переживання прекрасного в природі і в мистецтві);",
        "любов (духовна і фізична близькість з коханою людиною);",
        "матеріально забезпечене життя (відсутність матеріальних труднощів);",
        "наявність хороших і вірних друзів;",
        "суспільне покликання (повага оточуючих, колективу, товаришів по роботі);",
        "пізнання (можливість розширення своєї освіти, кругозору, загальної культури, інтелектуальне розвиток);",
        "продуктивна життя (максимально повне використання своїх можливостей, сил і здібностей);",
        "розвиток (робота над собою, постійне фізичне і духовне вдосконалення);",
        "розваги (приємне, необтяжливе проведення часу, відсутність обов'язків)",
        "свобода (самостійність, незалежність у судженнях і вчинках)",
        "щасливе сімейне життя",
        "щастя інших (добробут, розвиток і вдосконалення інших людей, всього народу, людства в цілому)",
        "творчість (можливість творчої діяльності)",
        "впевненість у собі (внутрішня гармонія, свобода від внутрішніх протиріч; сумнівів)."
    ]) {
        const elem = option.cloneNode(true)
        elem.id = makeid(5);
        elem.innerText = o;
        elem.style.display = "block";
        q_arange.appendChild(elem);
        const i = $(`#${elem.id}`)
        i.draggable({revert: true, revertDuration: 100, axis: 'y', snap: 'inner'});
        i.droppable({drop: function (event, ui)
            {
                var one = $(this).text();
                var two = ui.draggable.text();
                $(this).text(two);
                ui.draggable.text(one);
            }})
    }

}

const questions = [
    q("", "", )
]

setTimeout(createArangeOptions, 2)