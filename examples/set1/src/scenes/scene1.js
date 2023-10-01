let step_length = 2;
let floor_height = 650;

let img_background;
let img_player;

let img_background_inst;
let player;

function preload(s) {
    console.log("Executing preload() - SCENE 1");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 1");

    // Posizioniamo gli elementi nella scena
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player     = PP.assets.image.add(s, img_player, 0, floor_height, 0.5, 1);   // Posizionato in (0,650) con pivot in basso al centro

    // Dimezziamo le dimensioni del giocatore
    player.geometry.scale_x=0.5;
    player.geometry.scale_y=0.5;

}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

    console.log("Executing update() - SCENE 1");
    player.geometry.x += step_length; // Sposta il player verso destra, aumentanto la coordinata x

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 1");

}

PP.scenes.add("scene1", preload, create, update, destroy);