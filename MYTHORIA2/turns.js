// let start = document.querySelector("#start") ;
// let coin = document.querySelector("#coin");

// // start.addEventListener("click",()=>{
// //     let pile = document.createElement("img");
// //     pile.src = "img/pile.png";
// //     pile.className = "w-32 h-32";

// //     let face = document.createElement("img");
// //     face.src = "img/face.png";
// //     pile.className = "w-32 h-32";

// //     coin.append(pile,face);
// // });
// start.addEventListener('click', choisirFace)
// function choisirFace(){
//     coin.innerHTML = "";

//     let resultat =Math.random() < 0.5;
//     let image = document.createElement("img");

//     if (resultat){
//         image.src = "img/pile.png"
//     }
//     else{
//         image.src = "img/face.png";
//     }
//     image.className = "w-32 h-32 animate-pulse";
//     coin.append(image);
// }

let start = document.querySelector("#start");
let coin = document.querySelector("#coin");
let choixJoueur = "";



let btnPile = document.createElement("img");
btnPile.src = "img/pile.png";
btnPile.className = "w-32 h-32 cursor-pointer";

let btnFace = document.createElement("img");
btnFace.src = "img/face.png";
btnFace.className = "w-32 h-32 cursor-pointer";

coin.append(btnPile, btnFace);

btnPile.addEventListener("click", () =>{
    choixJoueur = "pile";
    console.log(choixJoueur);

});
btnFace.addEventListener("click",()=>{
    choixJoueur = "face";
        console.log(choixJoueur);

});

start.addEventListener("click",choisirFace);

function choisirFace(){
    if(choixJoueur === ""){
        alert("Choisissez Pile ou Face !");
        return;
    }
}

