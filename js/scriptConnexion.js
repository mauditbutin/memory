$(function () {

    let boutonValider = $(".btnConnexionValider");
    let tableauUser = JSON.parse(localStorage.getItem('logUsers'));
    let nomUser = $("#nomUserConnexion");
    let mdpUser = $("#mdpConnexion");
    let alerteConnexion = $(".alerteErreurConnexion");

    alerteConnexion.css('display', 'none');


    // ------------------------------------------------------------------------ //
    // CONNEXION AVEC VERIFICATION IDENTIFIANTS //
    // ------------------------------------------------------------------------ //


    boutonValider.on("click", (event) => {

        event.preventDefault();

        for (i=0; i < tableauUser.length; i++){
            if ( nomUser.val() === tableauUser[i].nom && mdpUser.val() === tableauUser[i].mdp ){
                localStorage.setItem('nomConnecte', nomUser.val());
                localStorage.setItem('etatConnexion', 'connecte');
                window.location.replace("http://127.0.0.1:5500/profil.html");
                return;
            } else {
                alerteConnexion.css('display', 'inline');
            }
        }

    })

}) // Fermeture fonction init