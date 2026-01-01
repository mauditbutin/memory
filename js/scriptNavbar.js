$(function () {

// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //
// GESTION DE LA NAVBAR - ETAT CONNECTE / DECONNECTE //
// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //

let btnConnexion = $(".btnConnexion");
let etatConnexion = localStorage.getItem('etatConnexion');


// ------------------------------------------------------------------------ //
// CREATION DE L'ETAT CONNECTE / DECONNECTE ET SON STOCKAGE LOCAL //
// ------------------------------------------------------------------------ //

if ( etatConnexion == null ){
    localStorage.setItem('etatConnexion', 'deconnecte')
} 


// ------------------------------------------------------------------------ //
// AFFICHAGE NAV - STATUT DECONNECTE //
// ------------------------------------------------------------------------ //

if ( etatConnexion === 'deconnecte'){
    btnConnexion.text("Connexion");
}


// ------------------------------------------------------------------------ //
// AFFICHAGE NAV - STATUT CONNECTE //
// ------------------------------------------------------------------------ //

if ( etatConnexion === 'connecte'){
    btnConnexion.text("Déconnexion");
}


// ------------------------------------------------------------------------ //
// COMPORTEMENT BOUTON CONNEXION SELON STATUT //
// ------------------------------------------------------------------------ //

    btnConnexion.on("click", (event) => {

        if ( etatConnexion === 'deconnecte'){
            event.preventDefault();
            window.location.replace("http://127.0.0.1:5500/connexion.html");
        }

        if ( etatConnexion === 'connecte'){
            event.preventDefault();
            localStorage.setItem('etatConnexion', 'deconnecte');
            localStorage.removeItem('nomConnecte');
            window.location.replace("http://127.0.0.1:5500/connexion.html");
        }

    })


}) // fermeture fonction init