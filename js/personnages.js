/**
 * fichier javascript en mode strict 
 */
 "use strict"; 


 /**
  * écouteur d'évènement qui appelle la fonction "chargementListePerso() après le chargement de la page.
  */
window.addEventListener("load", chargementListePerso(), false)

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

    /**
     * On créé une nouvelle instance en fonction de la classe choisie.
     */
    if (classe == "Guerrier") {
        personnage = new Guerrier(index, nom, race);
    } else if (classe == "Mage") {
        personnage = new Mage(index, nom, race);
    } else if (classe == "Voleur") {
        personnage = new Voleur(index, nom, race);
    }
        
    let strPerso = JSON.stringify(personnage);
    localStorage.setItem(index, strPerso);

};


/**
 * Fonction de suppression de personnage
 * @param {*} event évènement appelant (bouton supprimer sur la ligne du personnage concerné).
 */
function supprimer_perso(event) {

    var trid = $(event.target).closest('tr').attr('id'); // table row ID 
    var deleteLine = document.getElementById(trid);
    deleteLine.remove();
    localStorage.removeItem(trid);

    if (localStorage.length == 0) {
        setCookie("idPerso","","Thu, 01 Jan 1970 00:00:00 GMT");
    }

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
    let stats = "";

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);

            if (index == myId){

                let strPersonnage = localStorage.getItem(index);
                let personnage = JSON.parse(strPersonnage);

                stats =   '<table class="stats" id="contenu">'+
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