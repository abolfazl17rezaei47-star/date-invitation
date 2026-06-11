alert("SCRIPT VERSION 999");

const countdown = document.getElementById("countdown");

const hypnosis = document.getElementById("hypnosis");

const questionBox = document.getElementById("questionBox");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const heartScene = document.getElementById("heartScene");
const heartLeft = document.getElementById("heartLeft");
const heartRight = document.getElementById("heartRight");
const heartCenter = document.getElementById("heartCenter");

const catScene = document.getElementById("catScene");
const catTitle = document.getElementById("catTitle");
const catText = document.getElementById("catText");

const formBox = document.getElementById("formBox");

const progress = document.getElementById("progress");
const questionTitle = document.getElementById("questionTitle");
const options = document.getElementById("options");

const noteContainer = document.getElementById("noteContainer");
const noteInput = document.getElementById("noteInput");
const finishBtn = document.getElementById("finishBtn");

const resultBox = document.getElementById("resultBox");
const resultContent = document.getElementById("resultContent");

let answers = {};
let currentQuestion = 0;

const noTexts = [
    "نه",
    "نهههه 😂",
    "ولم کن 😭",
    "امکان نداره 😌",
    "نمیشه 😜",
    "بگیرم اگه تونستی 😎",
    "داری نزدیک میشی 😳",
    "اوه اوه 😬",
    "فرارررر 🏃",
    "ای بابا 😂"
];

const questions = [
    {
        key: "place",
        question: "خب... دوست داری کجا بریم؟ ✨",
        options: [
            "☕ یه کافه دنج",
            "🎬 سینما",
            "🍝 رستوران",
            "🌳 یه قدم زدن باحال"
        ]
    },
    {
        key: "food",
        question: "چی بخوریم؟ 🍽️",
        options: [
            "🍕 پیتزا",
            "🍔 برگر",
            "🍝 پاستا",
            "🍨 بستنی"
        ]
    },
    {
        key: "time",
        question: "کی بریم بهتره؟ ⏰",
        options: [
            "🌞 صبح",
            "😎 ظهر",
            "🌇 عصر",
            "🌙 شب"
        ]
    }
];

/* COUNTDOWN */

let number = 3;

countdown.innerText = number;

const timer = setInterval(() => {

    number--;

    if (number > 0) {

        countdown.innerText = number;

    } else {

        clearInterval(timer);

        countdown.innerText = "شما آماده شدید!";

        setTimeout(() => {

            countdown.style.display = "none";
            questionBox.style.display = "block";

            showIntro();

        }, 1800);

    }

}, 1000);

/* INTRO */

function showIntro() {

    setTimeout(() => {
        document.getElementById("hello1").style.opacity = "1";
    }, 300);

    setTimeout(() => {
        document.getElementById("hello2").style.opacity = "1";
    }, 1200);

    setTimeout(() => {
        document.getElementById("hello3").style.opacity = "1";
    }, 2200);

}

/* RUNAWAY BUTTON */

document.addEventListener("mousemove", (e) => {

    if (questionBox.style.display !== "block")
        return;

    const rect = noBtn.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) +
        Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 120) {

        const container =
            document.querySelector(".buttons");

        const containerRect =
            container.getBoundingClientRect();

        const maxMove = 80;

        const offsetX =
            (Math.random() * maxMove * 2) - maxMove;

        const offsetY =
            (Math.random() * maxMove * 2) - maxMove;

        noBtn.style.position = "relative";

        noBtn.style.left =
            offsetX + "px";

        noBtn.style.top =
            offsetY + "px";

        noBtn.innerText =
            noTexts[
                Math.floor(
                    Math.random() *
                    noTexts.length
                )
            ];
    }

});

/* YES */

yesBtn.addEventListener("click", () => {

    questionBox.style.display = "none";

    startHeartScene();

});

/* HEART */

function startHeartScene() {

    hypnosis.style.opacity = "0";

    document.body.style.background =
        "radial-gradient(circle at top,#243b55,#141414)";

    heartScene.style.display = "block";

    let left = -120;
    let right = -120;

    const move = setInterval(() => {

        left += 15;
        right += 15;

        heartLeft.style.left =
            left + "px";

        heartRight.style.right =
            right + "px";

        if (
            left >
            window.innerWidth / 2 - 90
        ) {

            clearInterval(move);

            heartLeft.style.display = "none";
            heartRight.style.display = "none";

            heartCenter.style.opacity = "1";

            setTimeout(() => {

                heartScene.style.display = "none";

                startCatScene();

            }, 1500);

        }

    }, 16);

}

/* CAT */

function startCatScene() {

    catScene.style.display = "block";

    setTimeout(() => {
        catTitle.style.opacity = "1";
    }, 500);

    setTimeout(() => {
        catText.style.opacity = "1";
    }, 1200);

    setTimeout(() => {

        catScene.style.display = "none";

        formBox.style.display = "block";

        showQuestion();

    }, 4000);

}

/* QUESTIONS */

function showQuestion() {

    const q = questions[currentQuestion];

    progress.innerText =
        `${currentQuestion + 1} / 4`;

    questionTitle.innerText =
        q.question;

    options.innerHTML = "";

    q.options.forEach(option => {

        const btn =
            document.createElement("button");

        btn.className = "option-btn";

        btn.innerText = option;

        btn.onclick = () => {

            answers[q.key] = option;

            currentQuestion++;

            if (
                currentQuestion <
                questions.length
            ) {

                showQuestion();

            } else {

                showNoteField();

            }

        };

        options.appendChild(btn);

    });

}

/* NOTE */

function showNoteField() {

    progress.innerText = "4 / 4";

    questionTitle.innerText =
        "چیزی میخوای بگی بگو ❤️";

    options.innerHTML = "";

    noteContainer.style.display = "block";

}

/* FINISH */

finishBtn.addEventListener("click", async () => {

    answers.note = noteInput.value.trim();

    const data = {
        place: answers.place || "",
        food: answers.food || "",
        time: answers.time || "",
        note: answers.note || ""
    };

    try {

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbx8V8xRqFxxjl_TE7AK8EHhHT6hpT_G2kNRJXOKs7NFOBpUDEiMTgku-r9EGa5pnwbdtA/exec",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.text();

        console.log(result);

        alert("ثبت شد 😌");

    } catch (error) {

        console.error(error);

        alert("خطا در ثبت اطلاعات");

    }

    showResult();

});

/* RESULT */

function showResult() {

    formBox.style.display = "none";

    resultBox.style.display = "block";

    resultContent.innerHTML = `
        <p><strong>📍 مقصد:</strong><br>${answers.place}</p>
        <br>
        <p><strong>🍽️ خوراکی:</strong><br>${answers.food}</p>
        <br>
        <p><strong>🕒 زمان:</strong><br>${answers.time}</p>
        <br>
        <p><strong>📝 توضیحات:</strong><br>${answers.note || "ندارد"}</p>
    `;

}
