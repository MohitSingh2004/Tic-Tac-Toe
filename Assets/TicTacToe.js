console.log("Welcome to Tic Tac Toe");

let gameloose = new Audio("Assets/TuneForLooser.wav");
let turnAudio = new Audio("Assets/TuneForMoves.mp3");
let gamewin = new Audio("Assets/TuneForWinner.wav");

let turn = "X";
let gameover = false;
let GameRunning = false;

// Turn change function
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// DOM Elements
let StartGame = document.getElementById("Start");
let gamecontainer = document.getElementById("gamecontainer");
let resetsection = document.getElementById("reset-section");
let loading = document.getElementById("Loading");
let wishes = document.getElementById("wishes");
let info = document.querySelector(".Info");
let playagain = document.getElementById("start-message");

// Start / Restart Button
StartGame.addEventListener("click", () => {
  if (GameRunning == false) {
    loading.style.display = "flex";
    setTimeout(() => {
      gamecontainer.style.display = "flex";
      gamecontainer.classList.remove("pop-in");
      void gamecontainer.offsetWidth;
      gamecontainer.classList.add("pop-in");
      loading.style.display = "none";

      GameRunning = true;
      StartGame.innerText = "Restart";
    }, 2000);
  } else {
    // Reset Game
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
      element.innerText = "";
    });
    turn = "X";
    gameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".line").style.transform = "none";

    wishes.style.display = "none";
    gamecontainer.style.display = "flex";
    info.style.display = "flex";
    info.innerText = "Turn for " + turn;
  }
});

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  boxtext.innerText = "";
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !gameover) {
      boxtext.innerText = turn;
      turnAudio.play();
      checkWin();
      if (!gameover) {
        turn = changeTurn();
        info.innerText = "Turn for " + turn;
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
    [6, 7, 8, 8.6, 255.2, 90],
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
      setTimeout(() => {
        playagain.style.display = "none";
        wishes.style.display = "flex";
        container.style.display = "none";
        info.style.display = "flex";
        gamewin.play();
      }, 2000);
    }
  });

  // Draw Checker
  let arr = Array.from(boxtext).filter((el) => el.innerText !== "");
  if (arr.length === 9 && !gameover) {
    info.innerText = "Oops! No one wins 😅";
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
