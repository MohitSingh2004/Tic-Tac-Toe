console.log("Welcome to Tic Tac Toe");

let gameloose = new Audio("Assets/TuneForLooser.wav");
let turnAudio = new Audio("Assets/TuneForMoves.mp3");
let gamewin = new Audio("Assets/TuneForWinner.wav");

let turn = "X";
let gameover = false;
let GameRunning = false;
let gameMode = false;
let cpuModeActive = false;

// Turn change function
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// DOM Elements
let StartGame = document.getElementById("Start");
let gamecontainer = document.getElementById("gamecontainer");
// let resetsection = document.getElementById("reset-section");
let loading = document.getElementById("Loading");
let Single = document.getElementById("Single");
let Multiplayer = document.getElementById("Multiplayer");
let startMessage = document.getElementById("start-message");
let Mode = document.getElementById("gameMode");
let info = document.querySelector(".Info");

// Start / Restart Button
StartGame.addEventListener("click", () => {
  Mode.style.display = "flex";
  Single.style.display = "flex";
  Multiplayer.style.display = "flex";
  startMessage.innerText = "Choose Your Game Mode ";
  gameMode = true;

  // Reset Game
  if (gameMode === true) {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
      element.innerText = "";
    });
    startMessage.innerText = "Enjoy the Game";
    turn = "X";
    gameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".line").style.transform = "none";
    info.innerText = "Turn for " + turn;
  }

  Multiplayer.addEventListener("click", () => {
    startMessage.innerText = "";
    Mode.innerText = "";
    if (GameRunning == false) {
      loading.style.display = "flex";
      setTimeout(() => {
        startMessage.innerText = "Enjoy the Game";
        gamecontainer.style.display = "flex";
        gamecontainer.classList.remove("pop-in");
        void gamecontainer.offsetWidth;
        loading.style.display = "none";
        gamecontainer.classList.add("pop-in");

        GameRunning = true;
        StartGame.innerText = "Restart";
      }, 2000);
    }
  });
  Single.addEventListener("click", () => {
    turn = "X";
    cpuModeActive = true;
    startMessage.innerText = "";
    Mode.innerText = "";
    if (GameRunning == false) {
      loading.style.display = "flex";
      setTimeout(() => {
        startMessage.innerText = "Enjoy the Game";
        gamecontainer.style.display = "flex";
        gamecontainer.classList.remove("pop-in");
        void gamecontainer.offsetWidth;
        loading.style.display = "none";
        GameRunning = true;
        gamecontainer.classList.add("pop-in");
        StartGame.innerText = "Restart";
      }, 2000);
    }
  });
});

function cpuMode() {
  let boxtext = document.querySelectorAll(".boxtext");
  cpuModeActive = true;
  let emptyBoxes = [];

  for (let i = 0; i < boxtext.length; i++) {
    if (boxtext[i].innerText === "") {
      emptyBoxes.push(boxtext[i]);
    }
  }

  if (emptyBoxes.length > 0) {
    let cpuRandom = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    cpuRandom.innerText = turn;
    turn = changeTurn();
    checkWin();
    if (!gameover) {
      info.innerText = "Turn for " + turn;
    }
  }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  boxtext.innerText == "";
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !gameover) {
      boxtext.innerText = turn;
      turnAudio.play();
      checkWin();
      if (!gameover) {
        turn = changeTurn();
        info.innerText = "Turn for " + turn;
        if (cpuModeActive && turn === "O") {
          setTimeout(() => {
            cpuMode();
          }, 400);
        }
      }
    }
  });
});

// Win Checker
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 8.6, 50.2, 180],
    [3, 4, 5, 8.6, 153.2, 180],
    [6, 7, 8, 8.6, 255.2, 180],
    [0, 3, 6, -93.8, 152, 90],
    [1, 4, 7, 10.6, 152, 90],
    [2, 5, 8, 112.6, 152, 90],
    [0, 4, 8, 11, 154.4, 225],
    [2, 4, 6, 16, 144.4, 135],
  ];

  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      let winner = boxtext[e[0]].innerText;
      info.innerText = `${winner} Won`;
      document.querySelector(".line").style.width = "282px";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}px,${e[4]}px) rotate(${e[5]}deg)`;
      gameover = true;
      gamecontainer.style.display = "flex";
      fireCrackers();
      info.style.display = "flex";
      gamewin.play();
    }
  });

  // Draw Checker
  let arr = Array.from(boxtext).filter((el) => el.innerText !== "");
  if (arr.length === 9 && !gameover) {
    info.innerText = "Oops! No one wins";
    gameover = true;
    gameloose.play();
  }
};

// Branding Animation: SENTI
const lettersContainer = document.getElementById("letters-container");
const word = "SENTI";
word.split("").forEach((letter, index) => {
  const letterElement = document.createElement("p");
  letterElement.textContent = letter;
  letterElement.setAttribute("data-aos", "fade-up");
  letterElement.setAttribute("data-aos-delay", 700 + index * 100);
  letterElement.setAttribute("data-aos-anchor-placement", "top-bottom");
  lettersContainer.appendChild(letterElement);
});

function fireCrackers() {
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
