$(function () {
  melangerCartes();

  let verificationCarte1;
  let verificationCarte2;
  let compteurClick = 0;
  let compteurCoups = 0;
  let clickPossible = true;


  // ------------------------------------------------------------------------//
  // Reset du plateau //
  // ------------------------------------------------------------------------//

  function resetPlateau() {
    $(".carte").removeClass("flip");
    $(".carte").removeClass("carteValidee");
    compteurCoups = 0;
    compteurClick = 0;
    $(".affichageNbCoups").text("0");
    setTimeout(() => {
      melangerCartes();
    }, 500); // Timeout sinon on voit la nouvelle image avant que la carte se retourne
  }


  // ------------------------------------------------------------------------ //
  // Reset des positions & retour face cachée au clic sur le bouton //
  // ------------------------------------------------------------------------ //

  $(".buttonResetPosition").on("click", resetPlateau);


  // ------------------------------------------------------------------------ //
  // Reset des positions & retour face cachée en appuyant sur espace //
  // ------------------------------------------------------------------------ //

  $("body").on("keydown", function (touche) {
    if (touche.code == "Space") {
      resetPlateau();
    }
  });



  // ------------------------------------------------------------------------ //
  // JEU //
  // ------------------------------------------------------------------------ //

  $(".carte").on("click", function () {

    if (!clickPossible) {return;}

    compteurClick++;
    console.log(compteurClick);

    if (compteurClick == 1) {
      $(this).addClass("flip");
      verificationCarte1 = $(this);
    }

    if (compteurClick == 2) {

      clickPossible = false; // Empêcher le joueur de cliquer pendant l'animation

      $(this).addClass("flip");
      verificationCarte2 = $(this);

      if (paireCartes(verificationCarte1, verificationCarte2)) {
        // console.log("C'est une paire");
        verificationCarte1.addClass("carteValidee");
        verificationCarte2.addClass("carteValidee");
        clickPossible = true;
      } else {
        setTimeout(function () {
          verificationCarte1.removeClass("flip");
          verificationCarte2.removeClass("flip");
          clickPossible = true;
        }, 700);

      }

      //console.log(compteurClick)
      compteurClick = 0;
      compteurCoups++;
      $(".affichageNbCoups").text(compteurCoups);
    }

    if (toutValide()) {
      setTimeout(function () {
        alert("Vous avez gagné en " + compteurCoups + " coups ! Bravo !");
      }, 500);
    }
  });
}); // Fermeture de la function d'init principale


// ------------------------------------------------------------------------//
// Placer aléatoirement les divs sur le plateau //
// ------------------------------------------------------------------------//


function melangerCartes() {
  const ensembleCartes = document.querySelectorAll(".carte");
  const indices = Array.from({ length: ensembleCartes.length }, (v, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  ensembleCartes.forEach(function (element, position) {
    element.style.order = indices[position];
  });
}


// ------------------------------------------------------------------------//
// Vérification victoire //
// ------------------------------------------------------------------------//

function toutValide() {
  if (
    $("#carte1").hasClass("carteValidee") &&
    $("#carte2").hasClass("carteValidee") &&
    $("#carte3").hasClass("carteValidee") &&
    $("#carte4").hasClass("carteValidee") &&
    $("#carte5").hasClass("carteValidee") &&
    $("#carte6").hasClass("carteValidee") &&
    $("#carte7").hasClass("carteValidee") &&
    $("#carte8").hasClass("carteValidee") &&
    $("#carte9").hasClass("carteValidee") &&
    $("#carte10").hasClass("carteValidee") &&
    $("#carte11").hasClass("carteValidee") &&
    $("#carte12").hasClass("carteValidee")
  ) {
    return true;
  }
}


// ------------------------------------------------------------------------//
// Vérification paire sur les 2 tirées //
// ------------------------------------------------------------------------//

function paireCartes(carte1, carte2) {
  if (
    (carte1.hasClass("motifA") && carte2.hasClass("motifA")) ||
    (carte1.hasClass("motifB") && carte2.hasClass("motifB")) ||
    (carte1.hasClass("motifC") && carte2.hasClass("motifC")) ||
    (carte1.hasClass("motifD") && carte2.hasClass("motifD")) ||
    (carte1.hasClass("motifE") && carte2.hasClass("motifE")) ||
    (carte1.hasClass("motifF") && carte2.hasClass("motifF"))
  ) {
    return true;
  } else {
    return false;
  }
}
