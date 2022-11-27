/**
 * fichier javascript en mode strict 
 */
"use strict"; 

/**
 * Retourne un nombre aléatoire situé entre le nombre mini et le nombre maxi fournis en paramètres.
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
};

/**
 * Fonction bouton play pour jouer la musique.
 */
function playTune() {
    var myAudio = document.getElementById("audio");
    myAudio.play();
};

/**
 * Fonction bouton stop pour arrêter la musique.
 */
function stopTune() {
    var myAudio = document.getElementById("audio");
    myAudio.pause();
};

/**
 * Fonction navigation vers la page "personnage.html".
 */
function nav_Personnages() {
    window.location.href="./pages/personnage.html";  
};

/**
 * Fonction navigation vers la page "index.html".
 */
function nav_Accueil() {
    window.location.href="./../index.html";  
};

/**
 * Créer un cookie dont le nom, la valeur et le nombre de jour pour expiration sont fournis en paramètres.
 * @param {*} cname 
 * @param {*} cvalue 
 * @param {number} exdays 
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
};

/**
 * Retourne la valeur du cookie dont le nom a été fourni en paramètre si il existe.
 * @param {*} cname 
 * @returns {*}
 */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        };
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        };
    };
    return "";
};

/**
 * Vérifie si le cookie de choxi de personnage existe.
 */
function verifCookieChoixPerso() {
    let idPerso = getCookie("idPerso");
    if (idPerso != "") {
        window.location.href="./pages/jeux.html";
    } else {
        alert("Merci de sélectionner votre personnage dans le menu ci-dessous")
    };
};

/**
 * Fonction non finalisée de gestion d'un combat entre un ennemi codé un dur
 * et le personnage dont on a récupéré les statistiques à partir de 
 * l'identifiant trouvé dans le cookie.
 */
function combat(){

    let personnageUpdate;
    let tabLvl = [100,250,600,1000,1500];

    let ennemyHP = 55;
    let ennemyXP = 20;
    let ennemyATK = 5;
    let ennemyDEF = 10;

    let id = getCookie("idPerso");

    let strPersonnage = localStorage.getItem(id);
    let personnage = JSON.parse(strPersonnage);

    let pvMaxInitiaux = personnage.pv;

    let divImage = document.getElementById("image-ennemy");
    let contenu ="";
    let nbLigne = 0;

    do {
        /**
         * Gestion des dégâts subis par l'ennemi.
         */
        let degatsfournis = (getRandomIntInclusive(15, 35) - ennemyDEF);
        ennemyHP = ennemyHP - degatsfournis;
        divImage.style.animation = 'shake 1s';
        contenu = "L'ennemi a subi "+degatsfournis+"<br>";
        document.getElementById("results").insertAdjacentHTML("beforeend", contenu);
        nbLigne = nbLigne + 1;
        if (nbLigne >= 4){
            document.getElementById("results").innerHTML="";
        };
        
        /**
         * Gestion de la mort de l'ennemi.
         */
        if (ennemyHP <= 0){
            contenu = "L'ennemi est mort...<br>";
            document.getElementById("results").insertAdjacentHTML("beforeend", contenu);
            nbLigne = nbLigne + 1;
            if (nbLigne >= 4){
                document.getElementById("results").innerHTML="";
            };
            personnage.xp = personnage.xp + ennemyXP;
            contenu = "Vous avez gagné "+ennemyXP+" pts d'expérience.<br>";
            document.getElementById('results').insertAdjacentHTML("beforeend", contenu);

            /**
             * Gestion de la montée en niveau du personnage.
             */
            if (personnage.xp >= tabLvl[personnage.lvl-1]){
                personnage.lvl = personnage.lvl +1;
                personnage.pv = pvMaxInitiaux + getRandomIntInclusive(15, 35);
                contenu = "Vous avez gagné un niveau.<br>";
                document.getElementById('results').insertAdjacentHTML("beforeend", contenu);
            } 
            break;
        }
        
        /**
         * Gestion des dégâts subis par le personnage.
         */
        let degatssubis = (getRandomIntInclusive(0, 5) + ennemyATK);
        personnage.pv = personnage.pv - degatssubis;
        contenu = "Vous avez subi "+degatssubis+"<br>";
        document.getElementById("results").insertAdjacentHTML("beforeend", contenu);
        nbLigne = nbLigne + 1;
        if (nbLigne >= 4){
            document.getElementById("results").innerHTML="";
        };
        
        /**
         * Gestion de la mort du personnage.
         */
        if (personnage.pv <= 0) {
            contenu = "Vous êtes mort...<br>";
            document.getElementById("results").insertAdjacentHTML("beforeend", contenu);
            nbLigne = nbLigne + 1;
            if (nbLigne >= 4){
                document.getElementById("results").innerHTML="";
            };
            break;
        };

    } while (ennemyHP >= 1);

    /**
     * On remet à jour les données du personnage dans le localstorage
     */
    if (personnage.classe == "Guerrier") {
        personnageUpdate = new Guerrier(id, personnage.nom, personnage.race, personnage.classe, personnage.lvl, personnage.pv, personnage.xp, "berserk", personnage.rage);
    } else if (personnage.classe == "Mage") {
        personnageUpdate = new Mage(id, personnage.nom, personnage.race, personnage.classe, personnage.lvl, personnage.pv, personnage.xp, "boule de feu", personnage.mana);
    } else if (personnage.classe == "Voleur") {
        personnageUpdate = new Voleur(id, personnage.nom, personnage.race, personnage.classe, personnage.lvl, personnage.pv, personnage.xp, "surinage", personnage.energie);
    }

    let strPerso = JSON.stringify(personnageUpdate);
    localStorage.setItem(id, strPerso);

    window.location.href="jeux.html";

};
