/**
 * fichier javascript en mode strict 
 */
 "use strict"; 

 /**
  * écouteur d'évènement qui appelle la fonction "chargementPerso() après le chargement de la page.
  */
window.addEventListener("load", chargementPerso(), false);

let contenu = "";
let ennemi;
var personnage;
let personnageUpdate;
let tabLvl = [100,250,600,1000,1500];
let pvMaxInitiaux;
let divImage = document.getElementById("image-ennemy");
let defenseUtilisee = false;
let techniqueUtilisee = false;
let nbAttaqueAvantMonstre = 1;
let hasAttacked = true;
let power;
let damage;
let ennemiPower;
let ennemiDamage;


/**
 * Fonction de chargement des données du personnage : 
 * Si le localstorage n'est pas vide, on boucle dessus afin de charger les stats
 * du personnage dont on a récupéré l'id dans le cookie.
 */
function chargementPerso(personnage){

    let idPerso = getCookie("idPerso");
    let stats = "";
    setCookie("nbLigne",0,1);

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);

            if (index == idPerso){

                let strPersonnage = localStorage.getItem(index);
                personnage = JSON.parse(strPersonnage);

                stats =   '<table class="stats">'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Nom</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.nom+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Race</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.race+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Classe</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.classe+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Points de vie</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.hp+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">'+personnage.typeEnergie+'</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.energie+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Attaque</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.atk+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Defense</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.def+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Intelligence</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.int+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Vitesse</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.speed+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Technique</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.nomtechnique+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Niveau</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.lvl+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<th scope="row" class="text-center text-nowrap">Experience</th>'+
                                    '<td class="text-center text-nowrap reponse">'+personnage.xp+'</td>'+
                                '</tr>'+
                            '</table>';

                break;

            } 
    
        }

        let deleteform = document.getElementById("contenu");
        if (deleteform != null){deleteform.remove();}
        document.getElementById('add_here').insertAdjacentHTML("afterend", stats);

    }

};


function combat(personnage) {

    document.getElementById('conteneur-boutons-1').style.display = "none";
    document.getElementById('conteneur-boutons-2').style.display = "flex";

    ajoutTexte("Vous décidez de combattre l'ennemi.<br>");

    ennemi = new Monstre("Squelette", "Skel", 1, 20, 10, 5, 5, 0);

    pvMaxInitiaux = personnage.pv;

    if (personnage.speed / ennemi.speed >= 2) {
        nbAttaqueAvantMonstre = 2;
    }

};


function fuite() {

    ajoutTexte("Vous avez fui le combat...<br>");

};


function fuite2() {

    document.getElementById('conteneur-boutons-1').style.display = "flex";
    document.getElementById('conteneur-boutons-2').style.display = "none";

    ajoutTexte("Vous avez abandonné la bataille...<br>");

};


function defendre() {
    personnage.def = personnage.def + 10;
    defenseUtilisee = true;
};


function technique() {
    personnage.technique();
    techniqueUtilisee = true;
    ajoutTexte("Vous avez utilisé "+personnage.nomtechnique+".");
};


function gameOverCheck(pHealth, eHealth) {
    if (pHealth <= 0) {
        ajoutTexte("Vous êtes mort...<br>");
        return true;
    } else if (eHealth <= 0) {
        ajoutTexte("Vous avez vaincu votre ennemi.<br>");
        return true;
    }
    return false;
};


function enemyTurn() {

    ennemiPower = ennemi.atk;
    ennemiDamage = ennemi.attaqueJoueur(ennemiPower, personnage);
    ajoutTexte("L'ennemi vous attaque pour "+ennemiDamage+".<br>");
    hasAttacked = true;

};
