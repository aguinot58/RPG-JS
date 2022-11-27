/**
 * fichier javascript en mode strict 
 */
 "use strict"; 


 /**
  * écouteur d'évènement qui appelle la fonction "chargementListePerso() après le chargement de la page.
  */
window.addEventListener("load", chargementListePerso(), false)


/**
 * @constructor
 * @this {Personnage}
 * @param {number} id 
 * @param {string} nom 
 * @param {string} race 
 * @param {string} classe 
 * @param {number} lvl 
 * @param {number} pv 
 * @param {number} xp 
 * @param {string} technique 
 */
function Personnage(id, nom, race, classe, lvl, pv, xp, technique){

    this.id = id;
    this.nom = nom;
    this.race = race;
    this.classe = classe;
    this.lvl = lvl;
    this.pv = pv;
    this.xp = xp;
    this.technique = technique;

};


/**
 * Créer une nouvelle instance de Guerrier qui hérite de Personnage
 * @constructor
 * @this {Guerrier}
 * @param {number} id 
 * @param {string} nom 
 * @param {string} race 
 * @param {string} classe 
 * @param {number} lvl 
 * @param {number} pv 
 * @param {number} xp 
 * @param {string} technique 
 * @param {number} rage 
 */
function Guerrier(id, nom, race, classe, lvl, pv, xp, technique, rage){

    Personnage.call(this, id, nom, race, classe, lvl, pv, xp, technique);
    this.rage = rage;

};


/**
 * Créer une nouvelle instance de Mage qui hérite de Personnage
 * @constructor
 * @this {Mage}
 * @param {number} id 
 * @param {string} nom 
 * @param {string} race 
 * @param {string} classe 
 * @param {number} lvl 
 * @param {number} pv 
 * @param {number} xp 
 * @param {string} technique 
 * @param {number} mana 
 */
function Mage(id, nom, race, classe, lvl, pv, xp, technique, mana){

    Personnage.call(this, id, nom, race, classe, lvl, pv, xp, technique);
    this.mana = mana;

};


/**
 * Créer une nouvelle instance de Voleur qui hérite de Personnage
 * @constructor
 * @this {Voleur}
 * @param {number} id 
 * @param {string} nom 
 * @param {string} race 
 * @param {string} classe 
 * @param {number} lvl 
 * @param {number} pv 
 * @param {number} xp 
 * @param {string} technique 
 * @param {number} energie 
 */
function Voleur(id, nom, race, classe, lvl, pv, xp, technique, energie){

    Personnage.call(this, id, nom, race, classe, lvl, pv, xp, technique);
    this.energie = energie;

};


/**
 * Créer une nouvelle instance de personnage en fonction des données saisies
 * dans le formulaire.
 * @param {Object} form formulaire
 */
function new_perso(form){

    let personnage;
    let indexIntermediaire;
    let index;

    if (localStorage.length > 0) {
        for( let i = 0; i < localStorage.length; i++){
            if (i == 0) {
                indexIntermediaire = localStorage.key(i);
            } else {
                if (localStorage.key(i) > indexIntermediaire) {
                    indexIntermediaire = localStorage.key(i);
                }
            }
        }
        index = parseInt(indexIntermediaire,10) + 1;
    } else {
        index = 1;
    }

    let nom = form.nom.value;
    let race = form.race.value;
    let classe = form.classe.value;
    let xp = 0;
    let lvl = 1;

    /**
     * On créé une nouvelle instance en fonction de la classe choisie.
     */
    if (classe == "Guerrier") {
        let pv = getRandomIntInclusive(125, 175);
        let rage = 100;
        personnage = new Guerrier(index, nom, race, classe, lvl, pv, xp, "berserk", rage);
    } else if (classe == "Mage") {
        let pv = getRandomIntInclusive(80, 100);
        let mana = getRandomIntInclusive(125, 175);
        personnage = new Mage(index, nom, race, classe, lvl, pv, xp, "boule de feu", mana);
    } else if (classe == "Voleur") {
        let pv = getRandomIntInclusive(100, 125);
        let energie = 100;
        personnage = new Voleur(index, nom, race, classe, lvl, pv, xp, "surinage", energie);
    }
        
    let strPerso = JSON.stringify(personnage);
    localStorage.setItem(index, strPerso);

};


/**
 * Fonction de suppressio nde personnage
 * @param {*} event évènement appelant (bouton supprimer sur la ligne du personnage concerné).
 */
function supprimer_perso(event) {

    var trid = $(event.target).closest('tr').attr('id'); // table row ID 
    var deleteLine = document.getElementById(trid);
    deleteLine.remove();
    localStorage.removeItem(trid);

};


/**
 * Fonction vérifiant la présence de données dans le localstorage
 * qui va ensuite remplir le tableau de listing de personnages
 * avec celles-ci le cas échéant.
 */
function chargementListePerso(){

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);
            let strPersonnage = localStorage.getItem(index);
            let personnage = JSON.parse(strPersonnage);

            const tbodyRef = document.getElementById('maTable').getElementsByTagName('tbody')[0];

            let tbodyRowCount = tbodyRef.rows.length;

            var row = tbodyRef.insertRow(tbodyRowCount);
            row.id = index;
            row.className = "align-middle text-center ligneTable"

            let idPerso = getCookie("idPerso");
            if (idPerso != "") {
                if (idPerso == index){
                    row.style.backgroundColor = '#ff780082';
                }
            }

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);

            cell1.innerHTML = personnage.nom;
            cell2.innerHTML = personnage.race;
            cell3.innerHTML = personnage.classe;
            cell4.innerHTML = personnage.lvl;
            cell5.innerHTML = '<input type="button" class="btn-choix bouton" value="Choisir" onclick="choisirPerso(event)" ><input type="button" class="btn-voir bouton" value="Voir" onclick="afficherPerso(event)" ><input type="button" class="bouton btn-suppr" value="Supprimer" onclick="supprimer_perso(event)" >';

        }
    }

};


/**
 * Fonction d'affichage du formulaire de création de personnage
 * si la quantité limite n'a pas été atteinte. 
 */
function affichage_NewPerso(){

    if (localStorage.length < 6) {
        document.getElementById('formulaire').style.display = "block";
    } else {
        alert("Nombre maximum de personnages atteint")
    }

};


/**
 * Fonction d'affichage des statistiques du personnage choisi.
 * @param {*} event évènement appelant (bouton voir sur la ligne du personnage concerné).
 */
function afficherPerso(event){

    let myId = $(event.target).closest('tr').attr('id');
    let contenu = "";

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);

            if (index == myId){

                let strPersonnage = localStorage.getItem(index);
                let personnage = JSON.parse(strPersonnage);

                if (personnage.classe == "Guerrier") {
                    type_energie = "Rage";
                    energie = personnage.rage;
                } else if (personnage.classe == "Mage") {
                    type_energie = "Mana";
                    energie = personnage.mana;
                } else if (personnage.classe == "Voleur") {
                    type_energie = "Energie";
                    energie = personnage.energie;
                };

                contenu = '<div id="contenu"><div class="row mt-4 mb-3"><div class="col"><label class="etiquette">Nom : </label><label class="reponse">'+
                            personnage.nom+'</label></div></div><div class="row mt-4 mb-3"><div class="col"><label class="etiquette">Race : </label>'+
                            '<label class="reponse">'+personnage.race+'</label></div><div class="col"><label class="etiquette">Classe : </label>'+
                            '<label class="reponse">'+personnage.classe+'</label></div></div><div class="row mt-4 mb-3"><div class="col">'+
                            '<label class="etiquette">HP : </label><label class="reponse">'+personnage.pv+'</label></div><div class="col">'+
                            '<label class="etiquette">'+type_energie+' : </label><label class="reponse">'+energie+'</label>'+
                            '</div></div><div class="row mt-4 mb-3"><div class="col"><label class="etiquette">Niveau : </label><label class="reponse">'+
                            personnage.lvl+'</label></div><div class="col"><label class="etiquette">Xp : </label><label class="reponse">'+personnage.xp+'</label>'+
                            '</div></div><div class="row mt-4 mb-3"><div class="col"><label class="etiquette">Technique : </label><label class="reponse">'+
                            personnage.technique+'</label></div></div></div>';

                break;

            } 
    
        }

        let deleteform = document.getElementById("contenu");
        if (deleteform != null){deleteform.remove();}
        document.getElementById('add_here').insertAdjacentHTML("afterend", contenu);

    }

}


/**
 * Fonction permettant de sélectionner un personnage dont on va stocker l'id dans un cookie.
 * @param {*} event évènement appelant (bouton choisir sur la ligne du personnage concerné).
 */
function choisirPerso(event){
    let myId = $(event.target).closest('tr').attr('id');
    setCookie("idPerso",myId,7);
    var tab_tr = document.getElementsByClassName('ligneTable');
    var lg_tab_tr = tab_tr.length;
    for (var i=0; i<lg_tab_tr; i++) {
        tab_tr[i].style.backgroundColor = 'rgba(139, 106, 56, 0.5)';
        if (tab_tr[i].id == myId) {
            tab_tr[i].style.backgroundColor = '#ff780082';
        }
    }
    
}