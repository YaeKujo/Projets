//Récupération des éléments HTML dont nous avons besoin pour le jeu
let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdinateur = document.getElementById("score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

//Fonction appelée à chaque fois qu'une manche est jouée
const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur");

    //Désactive les boutons de sélection des joueurs
    btnJoueur.forEach((btn) => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
    });

    //Ajoute la classe active au bouton choisi par le joueur
    choix.classList.remove("desactivated");
    choix.classList.add("active");

    //Stocke le choix du joueur
    let choixJoueur = choix.id;

    //Appelle la fonction pour que l'ordinateur fasse son choix et stocke le résultat
    let choixOrdi = faireChoixOridnateur();

    //Vérifie le gagnant de la manche et affiche le résultat
    verifierGagnant(choixJoueur, choixOrdi);

    //Rend visible le bouton pour passer à la manche suivante
    nextBtn.style.visibility = "visible";
};

//Constantes pour les choix possibles
const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

//Fonction pour que l'ordinateur fasse un choix aléatoire
const faireChoixOridnateur = () => {
    // 0 = pierre
    // 1 = feuille
    // 2 = ciseaux

    //Génère un nombre aléatoire entre 0 et 2 inclus
    let nbAleatoire = Math.floor(Math.random() * 3);

    //Ajoute la classe active au choix de l'ordinateur et retourne le choix
    switch (nbAleatoire) {
        case 0:
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            ofeuilleBtn.classList.add("active");
            return FEUILLE;
        default:
            ociseauxBtn.classList.add("active");
            return CISEAUX;
    }
};

//Fonction pour vérifier le gagnant de la manche
const verifierGagnant = (choixJoueur, choixOrdi) => {
    if (choixJoueur == choixOrdi) {
        //Egalité
        message.textContent = "Egalité !";
        return;
    }

    if (choixJoueur == PIERRE) {
        if (choixOrdi == FEUILLE) {
            //L'ordinateur gagne
            return victoireOrdinateur();
        } else if (choixOrdi == CISEAUX) {
            //Le joueur gagne
            return victoireJoueur();
        }
    }

    if (choixJoueur == CISEAUX) {
        if (choixOrdi == PIERRE) {
            return victoireOrdinateur();
        } else if (choixOrdi == FEUILLE) {
            return victoireJoueur();
        }
    }
};

const victoireOrdinateur = () => {
    message.textContent = "L'ordinateur gagne...";
    scoreOrdinateur.textContent++;
};

const victoireJoueur = () => {
    message.textContent = "Vous avez gagné ! :)";
    scoreJoueur.textContent++;
};

const preparerNouvelleManche = () => {
    btnJoueur.forEach((btn) => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

        btn.addEventListener("click", jouerManche);
    });

    nextBtn.style.visibility = "hidden";

    opierreBtn.classList.remove("active");
    ofeuilleBtn.classList.remove("active");
    ociseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer !";
};

nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;

    preparerNouvelleManche();
});