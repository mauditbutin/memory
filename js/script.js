$(function(){

    melangerCartes();

    /* flip de la carte au click */
    $(".carte").on("click", function(){
        $(this).addClass("flip");
    });

    /* Reset des positions & retour face cachée au clic sur le bouton */
    $(".buttonResetPosition").on("click", resetPlateau);

    /* Reset des positions & retour face cachée en appuyant sur espace */
    $("body").on("keydown", function(touche){ 
        if (touche.code == "Space"){
            resetPlateau();
        }
    })

}) // Fermeture de la function d'init principale


function melangerCartes(){
    
    const ensembleCartes = document.querySelectorAll('.carte'); 
    const indices = Array.from({length: ensembleCartes.length}, (v, i) => i); 

    for (let i = indices.length-1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i+1)); 
        [indices[i], indices[j]] = [indices[j], indices[i]];
        } 

    ensembleCartes.forEach(function(element, position){
        element.style.order = indices[position];
    }); 
};


function resetPlateau (){
        $(".carte").removeClass("flip");
        setTimeout(() => { melangerCartes(); },500); // Timeout sinon on voit la nouvelle image avant que la carte se retourne
}



    /* attribuer une image au dos de la carte */
    // $(".imgRevelee").attr('src', '../src/check.svg');