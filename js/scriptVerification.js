$(function () {

// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //
// VERIFICATION PAGE INSCRIPTION //
// ------------------------------------------------------------------------ //
// ------------------------------------------------------------------------ //

const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let alerteName = $(".alerteName");
let alerteMail = $(".alerteMail");
let alerteMdpConfirmation = $(".alerteMdpConfirmation");
let alerteMdpSymbole = $(".alerteMdpSymbole");
let alerteMdpChiffre = $(".alerteMdpChiffre");
let alerteMdpLongueur = $(".alerteMdpLongueur");

let nomUser = $("#nomUser");
let email = $("#email");
let mdp = $("#mdp");
let mdp2 = $("#mdp2");

const checkInscriptionNom = $(".checkInscriptionNom");
const checkInscriptionEmail = $(".checkInscriptionEmail");
const checkInscriptionMdp = $(".checkInscriptionMdp");
const checkInscriptionMdp2 = $(".checkInscriptionMdp2");

let boutonValider = $("#valider");
let visible = false;
let visibiliteMdp = $(".visibiliteMdp1");
let visibiliteMdp2 = $(".visibiliteMdp2");

let validationNom = false;
let validationMail = false;
let validationMdpChiffre = false;
let validationMdpSymbole = false;
let validationMdpLongueur = false;
let validationMdp = false;
let validationMdp2 = false;

alerteName.css('display', 'none');
alerteMail.css('display', 'none');
alerteMdpConfirmation.css('display', 'none');
checkInscriptionNom.css('display', 'none');
checkInscriptionEmail.css('display', 'none');
checkInscriptionMdp.css('display', 'none');
checkInscriptionMdp2.css('display', 'none');


// ------------------------------------------------------------------------ //
// VERIFICATION DU NOM //
// ------------------------------------------------------------------------ //

nomUser.on("input", () => {

    if ( nomUser.val().length < 3){
        alerteName.css('display', 'block');
        validationNom = false;
        checkInscriptionNom.css('display', 'none')
    } else { 
        alerteName.css('display', 'none') ;
        validationNom = true;
        checkInscriptionNom.css('display', 'inline');
    }

    deblocageBoutonValider()
})


// ------------------------------------------------------------------------ //
// VERIFICATION DU MAIL //
// ------------------------------------------------------------------------ //

email.on("input", () => { 

    if (email.val().match(regexMail) ) {
        alerteMail.css('display', 'none');
        validationMail = true;
        checkInscriptionEmail.css('display', 'inline')
    } else {
        alerteMail.css('display', 'block');
        validationMail = false;
        checkInscriptionEmail.css('display', 'none')
    }

    deblocageBoutonValider()
});


// ------------------------------------------------------------------------ //
// VISIBILITE DU MDP //
// ------------------------------------------------------------------------ //

function visibilite(cadenas, mdp){
    if(!visible){
        visible = true;
        cadenas.attr("src", "./src/lockOpen.svg");
        mdp.attr("type", "text")
    }
    else {
        visible = false;
        cadenas.attr("src", "./src/lockClose.svg");
        mdp.attr("type", "password")
    }
}   
    
visibiliteMdp.on("click", () => { visibilite(visibiliteMdp, mdp)});


// ------------------------------------------------------------------------ //
// VERIFICATION DU MDP //
// ------------------------------------------------------------------------ //

mdp.on("input", () => { 

    if (mdp.val().match( /[0-9]/ )){
        alerteMdpChiffre.css('color', '#585858');
        validationMdpChiffre = true;
    } else {
        alerteMdpChiffre.css('color', '#ff6262');
        validationMdpChiffre = false;
    }

    if (mdp.val().length < 6 ){
        alerteMdpLongueur.css('color', '#ff6262');
        validationMdpLongueur = false;
    } else {
        alerteMdpLongueur.css('color', '#585858');
        validationMdpLongueur = true;
    }

    if (mdp.val().match( /[! @#$%^&*]/ )){
        alerteMdpSymbole.css('color', '#585858');
        validationMdpSymbole = true;
    } else {
        alerteMdpSymbole.css('color', '#ff6262');
        validationMdpSymbole = false;
    }

    if ( validationMdpChiffre==true && validationMdpLongueur==true && validationMdpSymbole==true ) {
        validationMdp = true;
        checkInscriptionMdp.css('display', 'inline')
    } else {
        validationMdp = false;
        checkInscriptionMdp.css('display', 'none')
    }

    deblocageBoutonValider()

});


// ------------------------------------------------------------------------ //
// VERIFICATION DU MDP 2 (CONFIRMATION) //
// ------------------------------------------------------------------------ //

visibiliteMdp2.on("click", () => { visibilite(visibiliteMdp2, mdp2)});

mdp2.on("input", () => {

    if ( mdp.val() !== mdp2.val()) {
        alerteMdpConfirmation.css('display', 'block');
        validationMdp2 = false;
        checkInscriptionMdp2.css('display', 'none')
    } else {
        alerteMdpConfirmation.css('display', 'none');
        validationMdp2 = true;
        checkInscriptionMdp2.css('display', 'inline')
    }

    deblocageBoutonValider()

});


// ------------------------------------------------------------------------ //
// ACTIVATION DU BOUTON VALIDER //
// ------------------------------------------------------------------------ //

function deblocageBoutonValider(){
    
    if ( validationMail==true && validationMdp==true && validationMdp2==true && validationNom==true ){
       boutonValider.removeAttr("disabled")
    } else {
        boutonValider.attr("disabled", "disabled")
    }
}


// ------------------------------------------------------------------------ //
// CHANGEMENT DE COMPORTEMENT DU BOUTON VALIDER //
// ------------------------------------------------------------------------ //

boutonValider.on("click", (event) => {
    event.preventDefault();
    window.open("http://127.0.0.1:5500/connexion.html");
})


}) // Fermeture fonction init

