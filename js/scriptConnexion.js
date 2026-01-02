$(function () {

    let boutonValider = $(".btnConnexionValider");
    let tableauUser = JSON.parse(localStorage.getItem('logUsers'));
    let nomUser = $("#nomUserConnexion");
    let mdpUser = $("#mdpConnexion");
    let nomUserConnecte = $(".nomUserConnecte");
    let alerteConnexion = $(".alerteErreurConnexion");
    let etatConnexion = localStorage.getItem('etatConnexion');

    let affichageProfilDeconnecte = $(".profilDeconnecte");
    let affichageProfilConnecte = $(".profilConnecte");
    let tableauScores;
    let affichageScoresVides = $(".scoresVides");
    let affichageMeilleursScores = $(".meilleursScores");

    alerteConnexion.css('display', 'none');


    // ------------------------------------------------------------------------ //
    // CONNEXION AVEC VERIFICATION IDENTIFIANTS //
    // ------------------------------------------------------------------------ //


    boutonValider.on("click", (event) => {

        event.preventDefault();

        if (tableauUser == null){
            alerteConnexion.css('display', 'inline');
            return;
        }

        for (i=0; i < tableauUser.length; i++){
            if ( nomUser.val() === tableauUser[i].nom && mdpUser.val() === tableauUser[i].mdp ){
                localStorage.setItem('nomConnecte', nomUser.val());
                localStorage.setItem('etatConnexion', 'connecte');
                nomUserEnregistre = tableauUser[i].nom;
                tableauScores = tableauUser[i]['scores'];
                window.location.replace("http://127.0.0.1:5500/profil.html");
                return;
            } 
        }

        alerteConnexion.css('display', 'inline');

    })


    // ------------------------------------------------------------------------ //
    // AFFICHAGE DU PROFIL SELON STATUT //
    // ------------------------------------------------------------------------ //


    if ( etatConnexion === 'connecte' ){
        affichageProfilDeconnecte.css('display', 'none');
        affichageProfilConnecte.css('display', 'block');
        nomUserConnecte.html(localStorage.getItem('nomConnecte'));
    } else {
        affichageProfilDeconnecte.css('display', 'block');
        affichageProfilConnecte.css('display', 'none');
    }


    // ------------------------------------------------------------------------ //
    // AFFICHAGE DES MEILLEURS SCORES SI L'UTILISATEUR EST CONNECTE //
    // ------------------------------------------------------------------------ //

    let userConnecte = localStorage.getItem('nomConnecte');

    for (i=0; i < tableauUser.length; i++){
        if ( userConnecte === tableauUser[i].nom){
            if (tableauUser[i]['scores'].length == 0){
                affichageScoresVides.css('display', 'block');
                affichageMeilleursScores.css('display', 'none');
            } else {
                affichageScoresVides.css('display', 'none');
                affichageMeilleursScores.css('display', 'block');

                for (j=0; j<tableauUser[i]['scores'].length; j++){
                    let clone = $('.dataScoreTemplate').clone();
                    clone.attr('class', 'cloneDataScore');

                    if (j === 0){
                        clone.addClass('meilleurScore');
                    }

                    clone.find('.scoreNbCoup').text(tableauUser[i]['scores'][j].score);
                    clone.find('.scoreDate').text(tableauUser[i]['scores'][j].date);
                    clone.find('.scoreHeure').text(tableauUser[i]['scores'][j].heure);
                    clone.appendTo('.meilleursScores');
                    clone.css('display', 'flex');
                }

            }
        }             
    }


}) // Fermeture fonction init