/**
 * fichier javascript en mode strict 
 */
 "use strict"; 

class Personnage {

    constructor(id, nom, race) {
        this.id = id;
        this.nom = nom;
        this.race = race;
        this.lvl = 1;
        this.xp = 0;
        this.atk = 5;
        this.def = 5;
        this.int = 5;
        this.speed = 0;
    }
    attaqueEnnemi(power, ennemi){
        let damage = (this.atk + power) - ennemi.def;
        if (damage > 0) {
            ennemi.pv = ennemi.pv - damage;
            return damage
        } else {
            return damage
        }
    }

}

class Guerrier extends Personnage {

    constructor(id, nom, race) {
        super(id, nom, race);
        this.classe = "Guerrier";
        this.hp = getRandomIntInclusive(150, 175);
        this.typeEnergie = "Rage";
        this.energie = 100;
        this.nomtechnique = "Berserk";
        if (this.race == "Orc"){
            this.atk = this.atk + 10;
        }
    }

    technique(){
        this.atk = this.atk*2;
    }
    
}

class Mage extends Personnage {

    constructor(id, nom, race) {
        super(id, nom, race);
        this.classe = "Mage";
        this.hp = getRandomIntInclusive(50, 75);
        this.typeEnergie = "Mana";
        this.energie = getRandomIntInclusive(150, 175);
        this.nomtechnique = "Armure de givre";
        if (this.race == "Humain"){
            this.int = this.int + 10;
        }
    }

    technique(){
        this.def = this.def*2;
    }
    
}

class Voleur extends Personnage {

    constructor(id, nom, race) {
        super(id, nom, race);
        this.classe = "Voleur";
        this.hp = getRandomIntInclusive(100, 125);
        this.typeEnergie = "Energie";
        this.energie = 100;
        this.nomtechnique = "Potion de rapidite";
        if (this.race == "Elf"){
            this.speed = this.speed + 10;
        }
    }

    technique(){
        this.speed = this.speed*2;
    }
    
}


class Monstre {

    constructor(nom, type, lvl, xp, atk, def, int, speed) {
        this.nom = nom;
        this.type = type;
        this.lvl = lvl;
        this.xp = xp;
        this.atk = atk;
        this.def = def;
        this.int = int;
        this.speed = speed;
    }
    attaqueJoueur(power, joueur){
        let damage = (this.atk + power) - joueur.def;
        if (damage > 0) {
            joueur.pv = joueur.pv - damage;
            return damage
        } else {
            return damage
        }
    }

}