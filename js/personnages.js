var lastIndex;

function Personnage(id, nom, race, classe, pv, xp, technique){

    this.id = id;
    this.nom = nom;
    this.race = race;
    this.classe = classe;
    this.pv = pv;
    this.xp = xp;
    this.technique = technique;

};

function Guerrier(id, nom, race, classe, pv, xp, technique, rage){

    Personnage.call(this, id, nom, race, classe, pv, xp, technique);
    this.rage = rage;

};

function Mage(id, nom, race, classe, pv, xp, technique, mana){

    Personnage.call(this, id, nom, race, classe, pv, xp, technique);
    this.mana = mana;

};

function Voleur(id, nom, race, classe, pv, xp, technique, energie){

    Personnage.call(this, id, nom, race, classe, pv, xp, technique);
    this.energie = energie;

};


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

    if (classe == "Guerrier") {
        let pv = getRandomIntInclusive(125, 175);
        let rage = 100;
        personnage = new Guerrier(index, nom, race, classe, pv, xp, "berserk", rage);
    } else if (classe == "Mage") {
        let pv = getRandomIntInclusive(80, 100);
        let mana = getRandomIntInclusive(125, 175);
        personnage = new Mage(index, nom, race, classe, pv, xp, "boule de feu", mana);
    } else if (classe == "Voleur") {
        let pv = getRandomIntInclusive(100, 125);
        let energie = 100;
        personnage = new Voleur(index, nom, race, classe, pv, xp, "surinage", energie);
    }
    
    let strPerso = JSON.stringify(personnage);
    localStorage.setItem(index, strPerso);

};


function supprimer_perso(event) {

    var trid = $(event.target).closest('tr').attr('id'); // table row ID 
    var deleteLine = document.getElementById(trid);
    deleteLine.remove();
    localStorage.removeItem(trid);

};


function chargementTableau(typeContenu) {

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);
            let strPersonnage = localStorage.getItem(index);
            let personnage = JSON.parse(strPersonnage);

            const tbodyRef = document.getElementById('maTable').getElementsByTagName('tbody')[0];

            let tbodyRowCount = tbodyRef.rows.length;

            var row = tbodyRef.insertRow(tbodyRowCount);
            row.id = index;
            row.className = "align-middle text-center"
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            cell1.innerHTML = personnage.nom;
            cell2.innerHTML = personnage.race;
            cell3.innerHTML = personnage.classe;
            cell4.innerHTML = '<input type="button" class="open_modal bouton" value="Voir" onclick="afficherPerso(event)" ><input type="button" class="bouton btn-suppr" value="Supprimer" onclick="supprimer_perso(event)" >';

        }
    }
};


var modal = document.getElementById("Vue_Modal");
var fermeture = document.getElementsByClassName("close")[0];

function afficherPerso(event){

    let myId = $(event.target).closest('tr').attr('id');
    let contenu = "";

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);

            if (index == myId){

                let strPersonnage = localStorage.getItem(index);
                let Personnage = JSON.parse(strPersonnage);

                let typeEnergie = "";
                let valeurEnergie = 0;

                if (Personnage.classe == "Guerrier") {
                    typeEnergie = "Rage";
                    valeurEnergie = Personnage.rage
                } else if (Personnage.classe == "Mage") {
                    typeEnergie = "Mana";
                    valeurEnergie = Personnage.mana
                } else if (Personnage.classe == "Voleur") {
                    typeEnergie = "Energie";
                    valeurEnergie = Personnage.energie
                };

                contenu = '<div id="form-modal" class="modal-xl" name="formulaire"><div class="infos"><div class="row mt-4 mb-3">'+
                            '<div class="col"><label class="form-label">Nom : </label><label class="form-label donnee">'+
                            Personnage.nom+'</label></div></div><div class="row mt-4 mb-3"><div class="col"><label class="form-label">Race : </label>'+
                            '<label class="form-label donnee">'+Personnage.race+'</label></div></div><div class="row mt-4 mb-3">'+
                            '<div class="col"><label class="form-label">Classe : </label>'+'<label class="form-label donnee">'+Personnage.classe+
                            '</label></div></div><div class="row mt-4 mb-3"><div class="col"><label class="form-label">HP : </label><label class="form-label donnee">'+
                            Personnage.pv+'</label></div></div><div class="row mt-4 mb-3"><div class="col"><label class="form-label">'+typeEnergie+
                            ' : </label><label class="form-label donnee">'+valeurEnergie+'</label></div></div><div class="row mt-4 mb-3">'+
                            '<div class="col-6"><label class="form-label">XP : </label><label class="form-label donnee">'+Personnage.xp+'</label>'+
                            '</div></div><div class="row mt-4 mb-3"><div class="col"><label class="form-label">Technique : </label><label class="form-label donnee">'+
                            Personnage.technique+'</label></div></div></div><div class="img"><img src="./../img/'+Personnage.classe+'.png"></div></div>'

                break;

            } 
    
        }

        let deleteform = document.getElementById("form-modal");
        if (deleteform != null){deleteform.remove();}
        document.getElementById('add_here').insertAdjacentHTML("afterend", contenu);
        modal.style.display = "flex";

    }

};

fermeture.onclick = function() {
    modal.style.display = "none";
}