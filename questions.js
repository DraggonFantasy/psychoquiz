function q(qtype, arg1=null, arg2=null) {
    return {
        "type": qtype,
        "arg1": arg1,
        "arg2": arg2
    }
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

function createArangeOptions(index) {
    const q_arange = document.getElementById("q_arange_options");
    while(q_arange.hasChildNodes()) q_arange.removeChild(q_arange.firstChild)
    const option = document.querySelector(".arange-option");
    console.log(option)
    for(const j in arangeOptions[index]) {
        const o = arangeOptions[index][j]
        const elem = option.cloneNode(true)
        elem.id = `ao${j}` //makeid(5);
        elem.innerText = o;
        elem.style.display = "block";
        q_arange.appendChild(elem);
        const i = $(`#${elem.id}`)
        i.draggable({revert: true, revertDuration: 0, axis: 'y', snap: 'inner'});
        i.droppable({drop: function (event, ui)
            {
                var one = $(this).text();
                var two = ui.draggable.text();
                let oneI = parseInt($(this).attr('id').slice(2))
                let twoI = parseInt(ui.draggable.attr('id').slice(2))
                $(this).text(two);
                ui.draggable.text(one);
                let tmp = arangeOptions[index][oneI];
                arangeOptions[index][oneI] = arangeOptions[index][twoI];
                arangeOptions[index][twoI] = tmp;
                console.log(arangeOptions)

            }})
    }
}

const questions = [
    q("intro"),
    q("sex"),
    q("methodic",
    "МЕТОДИКА ДІАГНОСТИКИ СОЦІАЛЬНО-ПСИХОЛОГІЧНИХ УСТАНОВОК ОСОБИСТОСТІ МОТИВАЦІЙНО-ПОТРЕБОВОЇ СФЕРІ О.Ф.ПОТЬОМКІНОЇ",
        "Прочитавши запитання, дайте на них відповіді «так» чи «ні»."
        ),

    // Шкала А
    q("yesno", "Вам часто кажуть, що ви більше думаєте про інших, ніж про себе?"),
    q("yesno", "Вам легше просити за інших, ніж за себе?"),
    q("yesno", "Вам важко відмовити людям, коли вони про щось просять?"),
    q("yesno", "Ви часто намагаєтеся допомогти людям, якщо у них трапилися неприємності і біда?"),
    q("yesno", "Для себе ви робите щось з більшим задоволенням, ніж для інших?"),
    q("yesno", "Ви намагаєтеся зробити якомога більше для інших людей?"),
    q("yesno", "Ви переконані, що найбільша цінність — жити для інших людей?"),
    q("yesno", "Вам важко примусити себе щось зробити для інших?"),
    q("yesno", "Ваша характерна риса — безкорисливість?"),
    q("yesno", "Ви переконані, що турбота про інших часто шкодить вам?"),
    q("yesno", "Ви засуджуєте людей, котрі не вміють потурбувати ся про себе?"),
    q("yesno", "Ви часто просите людей зробити щось із корисливих спонук?"),
    q("yesno", "Ваша характерна риса — намагання допомогти іншим людям?"),
    q("yesno", "Ви вважаєте, що спочатку людина повинна думати про себе, а потім уже про інших?"),
    q("yesno", "Ви багато часу приділяєте своїй персоні?"),
    q("yesno", "Ви переконані, що не потрібно для інших сильно напружуватися?"),
    q("yesno", "Для себе у вас не вистачає ні сил, ні часу?"),
    q("yesno", "Вільний час ви використовуєте лише для своїх захоплень?"),
    q("yesno", "Ви можете назвати себе егоїстом?"),
    q("yesno", "Ви здатні зробити максимальні зусилля лише за високу винагороду?"),

    // Шкала Б
    q("yesno", "Процес виконуваної роботи захоплює вас більше, ніж її завершення?"),
    q("yesno", "Для досягнення мети ви не шкодуєте сил?"),
    q("yesno", "Ви довго не відважуєтеся розпочати робити те, що вам нецікаво, навіть якщо це необхідно?"),
    q("yesno", "Ви впевнені, що у вас вистачить наполегливості для завершення будь-якої справи?"),
    q("yesno", "Закінчуючи цікаву справу, ви шкодуєте, що вона вже завершена?"),
    q("yesno", "Вам більше до вподоби люди, здатні досягати результату, ніж ті, головною характеристикою яких є доброта і чуйність?"),
    q("yesno", "Ви отримуєте задоволення від гри, в якій не важливий результат?"),
    q("yesno", "Ви вважаєте, що успіхів у вашому житті більше, ніж невдач?"),
    q("yesno", "Ви більше поважаєте людей, здатних захопитися справою по-справжньому?"),
    q("yesno", "Ви часто завершуєте роботу, якщо не вистачає часу, склалася неприємна ситуація, існують зовнішні перешкоди?"),
    q("yesno", "Ви часто починаєте одночасно багато справ і не встигаєте їх закінчити?"),
    q("yesno", "Ви вважаєте, що маєте достатньо сил, щоб розраховувати на успіх у житті?"),
    q("yesno", "Чи можете ви захопитися справою настільки, що забуваєте про себе та час?"),
    q("yesno", "Вам часто вдається довести розпочату справу до кінця?"),
    q("yesno", "Чи буває, що, захоплюючись справами, ви не можете закінчити розпочате?"),
    q("yesno", "Ви уникаєте зустрічей із людьми, які не наділені діловими якостями?"),
    q("yesno", "Ви часто навантажуєте свої вихідні дні чи відпустку роботою, усвідомлюючи потребу щось зробити?"),
    q("yesno", "Ви вважаєте, що головне у будь-якій справі результат?"),
    q("yesno", "Погоджуючись на справу, ви думаєте про те, наскільки вона для вас є цікавою?"),
    q("yesno", "Прагнення до результату в будь-якій справі — риса, що вас вирізняє з-поміж інших?"),

    q("methodic", "МЕТОДИКА «ЦІННІСНІ ОРІЄНТАЦІЇ» РОКИЧА",
        "МЕТОДИКА «ЦІННІСНІ ОРІЄНТАЦІЇ» РОКИЧА\n" +
        "Інструкція: Зараз перед Вами речення з певними цінностями. Ваше завдання - розкласти (перетягнути) їх по порядку значимості для Вас як принципів, якими Ви керуєтеся у Вашому житті. \n" +
        "Під цифрою 1 буде найбільш вижлива цінність, а найменш важлива залишиться останньою і буде позначена цифрою 18. \n" +
        "Виконайте не поспішаючи, вдумливо. Кінцевий результат повинен відбивати Вашу справжню позицію\"."),
    q("arange", 1),
    q("arange", 2),

    q("methodic", "ОПИТУВАЛЬНИК “ЖИТТЄВІ ЗАВДАННЯ ОСОБИСТОСТІ” (РОЗРОБКА КОЛЕКТИВУ ЛАБОРАТОРІЇ СОЦІАЛЬНОЇ ПСИХОЛОГІЇ ОСОБИСТОСТІ ІСПП НАПН УКРАЇНИ ПІД КЕРІВНИЦТВОМ Т. М. ТИТАРЕНКО)",
        {"male": "Прочитавши запитання, дайте на них відповіді «згоден» чи «не згоден».. Навіть якщо Ви не можете погодитися із жодною відповіддю, все ж оберіть варіант, який більше для Вас прийнятний. \n",
              "female": "Прочитавши запитання, дайте на них відповіді «згодна» чи «не згодна».. Навіть якщо Ви не можете погодитися із жодною відповіддю, все ж оберіть варіант, який більше для Вас прийнятний. \n"}),
    q("agree", "У наш час роботу треба обирати радше за зарплатнею, ніж за уподобаннями"),
    q("agree", "Мені дуже б хотілося стати відомою людиною в цьому житті"),
    q("agree", "Я хочу багато чого змінити в собі"),
    q("agree", {"male": "Я б хотів у майбутньому займатися улюбленою справою, але важливіше заробляти гроші",
                            "female": "Я б хотіла у майбутньому займатися улюбленою справою, але важливіше заробляти гроші"}),
    q("agree", "Найактуальніше для мене сьогодні – створення сім’ї"),
    q("agree", "Я завжди чітко планую майбутнє"),
    q("agree", "Я більше живу сьогоднішнім днем, ніж майбутнім"),
    q("agree", "Я завжди дивлюся у майбутнє з оптимізмом, і тому мені не складно ставити нові життєві завдання"),
    q("agree", "Частіше я керую життєвими обставинами, а не вони мною"),
    q("agree", "Коли я ставлю перед собою завдання, мені ще невідомі шляхи його розв’язання"),
    q("agree", {"male": "Коли виникають перешкоди, я впевнений, що впораюся з проблемою",
                            "female": "Коли виникають перешкоди, я впевнена, що впораюся з проблемою"}),
    q("agree", {"male": "Завдання, які я ставлю, зазвичай виключають одне, я змушений вибирати",
                           "female": "Завдання, які я ставлю, зазвичай виключають одне, я змушена вибирати"}),
    q("agree", "Обставини мого життя суттєво вплинули на те, які життєві завдання я ставлю перед собою"),
    q("agree", "У разі зміни зовнішньої ситуації я не змінюю своїх завдань"),
    q("agree", "При постановці завдань я відчуваю, що можу гори звернути"),
    q("agree", "Буває, що я порушую встановлені правила"),
    q("agree", "Комфорт і безтурботність – у майбутньому мені більше нічого не треба"),
    q("agree", "Усі, урешті-решт, прагнуть влади"),
    q("agree", "Найголовніше життєве завдання людини – стати професіоналом у своїй справі"),
    q("agree", {"male": "Оскільки я не можу всіх зробити щасливими, я повинен подбати про себе",
                            "female": "Оскільки я не можу всіх зробити щасливими, я повинна подбати про себе"}),
    q("agree", "Думаю, що головне моє завдання – учитися"),
    q("agree", "Я більше довіряю плину подій, щасливому збігу обставин, ніж своїм намірам"),
    q("agree", "Можна не планувати життя далі ніж на рік уперед"),
    q("agree", "Думаючи про майбутнє, я часто уявляю всілякі неприємності"),
    q("agree", "Того, що я бачу як своє життєве завдання, я досягну власними силами"),
    q("agree", "Я завжди уявляю в подробицях, як буду рухатися до бажаного результату"),
    q("agree", "Переді мною постає стільки життєвих труднощів, що подолати їх усі просто неможливо"),
    q("agree", "Іноді мої життєві завдання суперечать одне одному, і я не можу здійснити все"),
    q("agree", "Не думаю, що життєві завдання визначаються обставинами мого життя"),
    q("agree", "Я легко переключаюся з одного життєвого завдання на інше"),
    q("agree", "Нові завдання мене більше бентежать, аніж мобілізують"),
    q("agree", "Я завжди дотримуюся своїх обіцянок"),
    q("agree", "Головне для мене в майбутньому – це матеріальна забезпеченість"),
    q("agree", "Досягненням є те, що визнають інші"),
    q("agree", "Єдине справжнє життєве завдання – це пошук себе, самовдосконалення"),
    q("agree", "Мені подобається допомагати іншим, коли це не заважає кар’єрі"),
    q("agree", "Життєвий успіх неможливий без доброго здоров’я"),
    q("agree", "Час життя обмежений, але мені вдається використовувати його оптимально"),
    q("agree", "Найголовніше у моєму житті відбуватиметься протягом найближчих п’яти років"),
    q("agree", "Мене лякають усілякі несподіванки, що чекають у майбутньому"),
    q("agree", "Приймаючи життєве рішення, я більше орієнтуюся на “так треба”, “так прийнято”, аніж на “я хочу цього”, “це мені потрібно”"),
    q("agree", "Я часто не можу вирішувати свої життєві завдання – не маю часу, грошей, інформації, допомоги"),
    q("agree", "Якщо в моєму житті не вистачає складностей, я їх шукаю"),
    q("agree", "Усі мої життєві завдання я легко можу розташувати за важливістю"),
    q("agree", "Мені неважко проаналізувати причини та наслідки своїх життєвих завдань"),
    q("agree", {"male": "Я намагаюся досягти того, що запланував, навіть усупереч обставинам",
                            "female": "Я намагаюся досягти того, що запланувала, навіть усупереч обставинам"}),
    q("agree", {"male": "Мені неважко тривалий час бути включеним в активну діяльність",
                            "female": "Мені неважко тривалий час бути включеною в активну діяльність"}),
    q("agree", "Я ніколи не відкладаю на завтра те, що можна зробити сьогодні"),
    q("agree", "Усі хочуть мати престижні речі"),
    q("agree", "У житті мало речей, важливіших за успіх"),
    q("agree", "Я думаю, що впливати на власний розвиток дуже важко"),
    q("agree", "Покращити світ навіть у чомусь незначному – моє життєве завдання"),
    q("agree", "Молода людина може поки що не замислюватися серйозно про своє здоров’я"),
    q("agree", "Життя таке непередбачуване, що не варто його планувати"),
    q("agree", "У віці моїх батьків я досягну справжнього успіху"),
    q("agree", "Не варто очікувати від майбутнього чогось особливо хорошого"),
    q("agree", "У своєму житті я дотримуюся принципів, заснованих на почутті обов’язку"),
    q("agree", "Ставлячи перед собою важливе життєве завдання, я знаю, чого хочу досягти в кінцевому підсумку"),
    q("agree", "У мене не такий сильний характер, щоб проявляти стійкість у складних обставинах"),
    q("agree", "Я завжди чітко знаю, що для мене головне в житті"),
    q("agree", "Часто я не враховую далекі наслідки тих життєвих завдань, які ставлю перед собою тепер"),
    q("agree", "Якщо не буде виходити так, як задумано спочатку, я робитиму це іншим чином"),
    q("agree", "Я більше люблю спокійний відпочинок, ніж бурхливі розваги"),
    q("agree", "Непристойні жарти викликають у мене сміх"),
    q("agree", "Для щастя необхідні гроші"),
    q("agree", "Між престижною і цікавою роботою я радше оберу престижну"),
    q("agree", "Життєві труднощі радше перешкоджають моєму розвитку, ніж допомагають"),
    q("agree", "Більшість завдань у житті вимагають насамперед сумлінної праці, а не творчості"),
    q("agree", "Спочатку треба стати на ноги, а вже потім думати про все інше"),
    q("agree", {"male": "Я нерідко сам не знаю, чого хочу і яким чином слід діяти в різних життєвих обставинах",
                            "female": "Я нерідко сама не знаю, чого хочу і яким чином слід діяти в різних життєвих обставинах"}),
    q("agree", "У мене є завдання, розраховані на все життя"),
    q("agree", "Я вірю в себе, і тому майбутнє мене не страшить"),
    q("agree", "Мої життєві успіхи більше залежать від вдалого збігу обставин, ніж від моїх здібностей і зусиль"),
    q("agree", "Без усебічного аналізу обставин я, як правило, не ставлю важливі для мого майбутнього завдання"),
    q("agree", "Несподівані зміни на тривалий час вибивають мене з колії"),
    q("agree", "Мені важко зрозуміти, які життєві завдання для мене важливіші: чи навчання, чи робота, чи дружба, чи сім’я"),
    q("agree", "Для вирішення життєвого завдання не обов’язково враховувати попередній досвід"),
    q("agree", "Мені подобається, коли, крім завдання, я отримую план його розв’язання"),
    q("agree", "На жаль, у мене недостатньо сил та енергії для втілення в життя намічених завдань"),
    q("agree", "Якщо я не правий, то ніколи не серджуся"),
    q("agree", "Без друзів я не досягну успіху в житті"),
    q("agree", "Я планую своє майбутнє до дрібниць, крок за кроком"),
    q("agree", "У грі я люблю бути переможцем"),
    q("agree", "Сім’я і діти – це поки що не для мене"),
    q("agree", "Я зазвичай ставлю перед собою конкретні завдання та намічаю реальні строки їх виконання"),
    q("agree", "Буває, чиясь необачність викликає у мене сміх"),
    q("agree", "На першому місці завжди мають бути друзі"),

    q("methodic", "АНКЕТА «МОТИВИ ВОЛОНТЕРСЬКОЇ ДІЯЛЬНОСТІ»",
        "Вам потрібно обрати варіанти або написати відповідь, яка найточніше описує Вашу думку"),
    q("input", "Чому Ви почали займатися волонтерською діяльністю?"),
    q("input", "Ваш досвід волонтерської діяльності"),
    q("input", "Опишіть Ваші основні функції як волонтера?"),
    q("choiceWithCustom", "Мені подобається волонтерська діяльність як змога знайти: ",
        ["Друзів", "Кохану людину", "Однодумців"]),
    q("choice", "Скільки Ви витрачаєте часу на волонтерську діяльність? (кількість годин на тиждень): ",
        ["менше ніж 5 годин", "5-10 годин", "понад 11 годин"]),
    q("input", "Скільки часу Ви ще плануєте займатися волонтерською діяльністю?"),
    q("yesno", "Чи схвалюють Вашу волонтерську діяльність сім'я та близькі люди?"),
    q("yesno", "Чи є серед вашого оточення учасники бойових дій?"),
    q("choice", "Оцініть за шкалою від 0 до 5, наскільки сильно ви відчуваєте підтримку вашої діяльності оточуючими сьогодні?<br>" +
        "0. перешкоджають мені у реалізації цього прагнення<br>" +
        "1. трохи перешкоджають мені у реалізації цього прагнення<br>" +
        "2. не підтримують мене і не перешкоджають мені у реалізації цього прагнення<br>" +
        "3. трохи підтримують мене у реалізації цього прагнення<br>" +
        "4. підтримують мене у реалізації цього прагнення<br>" +
        "5. повністю підтримують мене у реалізації цього прагнення",
        ["0",
              "1",
              "2",
              "3",
              "4",
              "5"]),
    q("choice", "Що, на вашу думку, є основним мотивом для здійснення добровільної діяльності?",
        ["Бажання заявити про себе", "Потреба допомагати людям", "Значимість і престиж", "Достатня кількість вільного часу"]),
    q("methodic", "", "Оцініть кожен із запропонованих мотивів за шкалою від 0 до 5. Залежно від того, наскільки він для Вас важливий у Вашій діяльності?"),
    q("choice", "Хочу приносити користь",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу відплатити людям добром за добро",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Для власного задоволення",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу вирішити проблему, що хвилює мене особисто",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу отримати новий досвід чи знання",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу мати якесь заняття",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу познайомитися з новими людьми",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу підвищити свою самооцінку",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу самореалізуватися",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Хочу отримати повагу та визнання оточуючих",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Не можу дивитися байдуже на страждання інших",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),
    q("choice", "Тому що друзі (знайомі, родичі) беруть участь",
        ["зовсім не важливо", "майже не важливо", "відносно важливо", "безперечно важливо", "дуже важливо"]),

    q("yesno", "Чи Ви є вимушено переміщеною особою?"),
    q("input", "Ваша спеціальність/професія?"),
    q("input", "Ваш вік"),

    q("outro")
]


const arangeOptions = [
    [
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
    ],
    [
        "акуратність (охайність), вміння тримати в порядку речі, порядок у справах;",
        "вихованість (гарні манери);",
        "високі запити (високі вимоги до життя і високі домагання);",
        "життєрадісність (почуття гумору);",
        "старанність (дисциплінованість);",
        "незалежність (здатність діяти самостійно, рішуче);",
        "непримиренність до недоліків у собі та інших;",
        "освіченість (широта знань, висока загальна культура);",
        "відповідальність (почуття боргу, уміння тримати своє слово);",
        "раціоналізм (вміння тверезо і логічно мислити, приймати обдумані, раціональні рішення);",
        "самоконтроль (стриманість, самодисципліна);",
        "сміливість у відстоєнні своєї думки, поглядів;",
        "тверда воля (вміння настояти на своєму, не відступати перед труднощами)",
        "терпимість (до поглядів і думок інших, вміння прощати іншим їхні помилки та омани)",
        "широта поглядів (уміння зрозуміти чужу точку зору, поважати інші смаки, звичаї, звички)",
        "чесність (правдивість, щирість)",
        "ефективність у справах (працьовитість, продуктивність у роботі)",
        "чуйність (дбайливість)"
    ]
]

// setTimeout(createArangeOptions, 2)