/* fichier javascript en mode strict */
"use strict"; 

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

function playTune() {
    var myAudio = document.getElementById("audio");
    myAudio.play();
};

function stopTune() {
    var myAudio = document.getElementById("audio");
    myAudio.pause();
};

function nav_Personnages() {
    window.location.href="./pages/personnage.html";  
};

function nav_Accueil() {
    window.location.href="./../index.html";  
};