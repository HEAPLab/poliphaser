let img_background;
let img_player;

let player;
let floor;

function preload(s) {
    console.log("Executing preload() - SCENE 1");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");
}

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 1");
    
    PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player = PP.assets.image.add(s, img_player, 150, 630, 0.5, 1);
    
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 

}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 1");

}

PP.scenes.add("scene", preload, create, update, destroy);