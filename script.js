let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("newgame");
let restartBtn = document.getElementById("restart");
let playAIBtn = document.getElementById("playAI");
let play2PBtn = document.getElementById("play2P");
let msgRef = document.getElementById("message");
let gameModeHeading = document.getElementById("gameModeHeading");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;
let playWithAI = false;

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
};

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerHTML = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
    xTurn = true;
};

const winFunction = (letter) => {
    disableButtons();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
};

const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
    popupRef.classList.remove("hide");
};

const aiMove = () => {
    let availableButtons = Array.from(btnRef).filter(btn => btn.innerHTML === "");
    if (availableButtons.length > 0) {
        let randomBtn = availableButtons[Math.floor(Math.random() * availableButtons.length)];
        randomBtn.innerHTML = "O";
        randomBtn.disabled = true;
        count += 1;
        winChecker();
        if (count == 9 && !popupRef.classList.contains("hide")) {
            drawFunction();
        }
    }
};

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    popupRef.classList.add("hide"); // Hide the popup when starting a new game
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
    if (playWithAI) {
        aiMove();
    }
});

playAIBtn.addEventListener("click", () => {
    playWithAI = true;
    playAIBtn.classList.add("hide");
    play2PBtn.classList.remove("hide");
    gameModeHeading.innerText = "It is a Play with AI game";
    gameModeHeading.classList.remove("hide");
    count = 0;
    enableButtons();
    aiMove();
});

play2PBtn.addEventListener("click", () => {
    playWithAI = false;
    play2PBtn.classList.add("hide");
    playAIBtn.classList.remove("hide");
    gameModeHeading.innerText = "It is a 2 player game";
    gameModeHeading.classList.remove("hide");
    count = 0;
    enableButtons();
});

const winChecker = () => {
    for (let i of winningPattern) {
        let [element1, element2, element3] = [btnRef[i[0]].innerText, btnRef[i[1]].innerText, btnRef[i[2]].innerText];
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                winFunction(element1);
                return;
            }
        }
    }
    if (count == 9) {
        drawFunction();
    }
};

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            element.innerText = "X";
            xTurn = false;
        } else {
            element.innerText = "O";
            xTurn = true;
        }
        element.disabled = true;
        count += 1;
        winChecker();
        if (!xTurn && playWithAI && popupRef.classList.contains("hide")) {
            aiMove();
            xTurn = true;
        }
    });
});

window.onload = enableButtons;
