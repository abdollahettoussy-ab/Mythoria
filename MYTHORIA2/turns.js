import { gameStat } from "./state.js";

const hpAdversaire = document.querySelector("#hpAdversaire");
const hpPlayer = document.querySelector("#hpPlayer");
const factionAdversaire = document.querySelector("#factionAdversaire");
const factionPlayer = document.querySelector("#factionPlayer"); 
const deckAdversaire = document.querySelector("#deckAdversaire");
const deckPlayer = document.querySelector("#deckPlayer");
const botCards = [
    document.querySelector("#botCard1"),
    document.querySelector("#botCard2"),
    document.querySelector("#botCard3"),
    document.querySelector("#botCard4"),
    document.querySelector("#botCard5")
];
const playerCards = [
    document.querySelector("#playerCard1"),
    document.querySelector("#playerCard2"),
    document.querySelector("#playerCard3"),
    document.querySelector("#playerCard4"),
    document.querySelector("#playerCard5")
];



let start = document.querySelector("#start");
let coin = document.querySelector("#coin");
let choixJoueur = "";
let resultatJeu = document.querySelector("#resultatJeu");
let choixCamp = document.querySelector("#choixCamp");
let lumiere = document.querySelector("#lumiere");
let tenebres = document.querySelector("#tenebres");





let btnPile = document.createElement("img");
btnPile.src = "img/pile.png";
btnPile.className = "w-32 h-32 cursor-pointer";

let btnFace = document.createElement("img");
btnFace.src = "img/face.png";
btnFace.className = "w-32 h-32 cursor-pointer";

let coinInner = document.createElement("div");
coinInner.className = "coin-inner";


coin.append(btnPile, btnFace);





btnPile.addEventListener("click", () => {
    choixJoueur = "pile";
    console.log(choixJoueur);

});
btnFace.addEventListener("click", () => {
    choixJoueur = "face";
    console.log(choixJoueur);

});

start.addEventListener("click", choisirFace);

function choisirFace() {


    if (choixJoueur === "") {
        alert("Choisissez Pile ou Face !");
        return;
    }
    coin.innerHTML = "";

    coinInner.append(btnPile, btnFace);
    coin.append(coinInner);

    let resultat = Math.random() < 0.5 ? "pile" : "face";
    let tours = 5;
    let rotation = tours * 360;
    if (resultat === "face") {
        rotation += 180;

    }
    coinInner.style.setProperty("--rotation", rotation + "deg");

    coinInner.classList.add("flip");
    coinInner.addEventListener("animationend", () => {
        if (choixJoueur === resultat) {
            gameStat.currentTurn = "player";
            resultatJeu.textContent = "Vous commencez !";
            choixCamp.classList.remove("hidden");
        }
        else {
            gameStat.currentTurn = "adversaire";
            gameStat.adversaire.faction = Math.random() < 0.5 ? "Lumière " : "Ténèbres";
            gameStat.player.faction = gameStat.adversaire.faction === "Lumière" ? "ténèbres" : "Lumière";
            resultatJeu.textContent = `Mode choisi : ${gameStat.player.faction}`;
            ;
        }
        btnFace.classList.add("hidden");
        btnPile.classList.add("hidden");
    });
    lumiere.addEventListener("click", () => {
        gameStat.player.faction = "Lumière";

        if (gameStat.player.faction === "Lumière") {
            gameStat.adversaire.faction = "Ténèbres"
        }
        else {
            gameStat.adversaire.faction = "Lumière"
        }
        resultatJeu.textContent = "";
        choixCamp.classList.add("hidden");

    });
    tenebres.addEventListener("click", () => {
        gameStat.player.faction = "Ténèbres";

        if (gameStat.player.faction === "Ténèbres") {
            gameStat.adversaire.faction = "Lumière"
        }
        else {
            gameStat.adversaire.faction = "Ténèbres"
        }
        resultatJeu.textContent = "";
        choixCamp.classList.add("hidden");
    });

}






