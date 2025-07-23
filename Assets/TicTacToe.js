console.log("Welcome to Tic Tac Toe");
let gameloose = new Audio("Assets/TuneForLooser.wav");
let turnAudio = new Audio("Assets/TuneForMoves.mp3");
let gamewin = new Audio("Assets/TuneForWinner.wav");
let turn = "X";
let gameover = false;
let GameRunning = false;

const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

//Start
let StartGame = document.getElementById("Start");
let gamecontainer = document.getElementById("gamecontainer");
let resetsection = document.getElementById("reset-section");
let loading = document.getElementById("Loading");
StartGame.addEventListener("click", () => {
  if (GameRunning == false) {
    loading.style.display = "flex";
    setTimeout(() => {
      gamecontainer.style.display = "flex";
      loading.style.display = "none";
    }, 2000);
    GameRunning = true;
    StartGame.innerText = "Restart";
  } else {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach((element) => {
      element.innerText = "";
    });
    turn = "X";
    document.querySelector(".line").style.width = "0vw";
    gameover = false;
    document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;

    //   let reset = document.getElementById("reset");
    //   reset.addEventListener("click", () => {    });
    // }
  }
});

//Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  boxtext.innerText = "";
  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !gameover) {
      boxtext.innerText = turn;
      turn = changeTurn();
      turnAudio.play();
      checkWin();
      if (!gameover) {
        document.getElementsByClassName("Info")[0].innerText =
          "Turn for " + turn;
      }
    }
  });
});

//Winner checking
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 0.6, 3.7, 180],
    [3, 4, 5, 0.6, 11.2, 180],
    [6, 7, 8, 0.6, 18.7, 90],
    [0, 3, 6, -6.8, 11, 90],
    [1, 4, 7, 0.6, 11, 90],
    [2, 5, 8, 8.3, 11, 90],
    [0, 4, 8, 0, 9.9, 225],
    [2, 4, 6, 1, 10.9, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".Info").innerText =
        boxtext[e[0]].innerText + " Won";

      gameover = true;
      gamewin.play();
      document.querySelector(".line").style.width = "20.5vw";
      document.querySelector(
        ".line"
      ).style.transform = `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
    }
  });
};

//Refresh
// let reset = document.getElementById("reset");
// reset.addEventListener("click", () => {
//   let boxtexts = document.querySelectorAll(".boxtext");
//   Array.from(boxtexts).forEach((element) => {
//     element.innerText = "";
//   });
//   turn = "X";
//   document.querySelector(".line").style.width = "0vw";
//   gameover = false;
//   document.getElementsByClassName("Info")[0].innerText = "Turn for " + turn;
// });

//Branding
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
