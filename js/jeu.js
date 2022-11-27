/**
 * fichier javascript en mode strict 
 */
 "use strict"; 

 /**
  * écouteur d'évènement qui appelle la fonction "chargementPerso() après le chargement de la page.
  */
window.addEventListener("load", chargementPerso(), false);

/**
 * Fonction de chargement des données du personnage : 
 * Si le localstorage n'est pas vide, on boucle dessus afin de charger les stats
 * du personnage dont on a récupéré l'id dans le cookie.
 */
function chargementPerso(){

    let idPerso = getCookie("idPerso");
    let contenu = "";

    if (localStorage.length > 0) {

        for( let i = 0; i < localStorage.length; i++){

            let index = localStorage.key(i);

            if (index == idPerso){

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