let step_length = 2;
let floor_height = 650;

let img_background;
let ss_player;

let img_background_inst;
let player;

function preload(s) {
    console.log("Executing preload() - SCENE 6");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");

    // Carico lo spritesheet del giocatore
    ss_player      = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 223, 190);

} 

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 6");

    // Posizioniamo gli elementi nella scena
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player     = PP.assets.sprite.add(s, ss_player, 100, floor_height, 0.5, 1);
    
    PP.assets.sprite.animation_add(player, "die", 0, 5, 10, 0);                         // Frame da 0 a 6, a 10 fps, una sola volta
    PP.assets.sprite.animation_add_list(player, "run", [6, 13, 20, 27, 34], 10, -1);    // Lista di frame, a 10 fps, inifito

    PP.assets.sprite.animation_play(player, "die"); // Prova anche "run"

}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 6");

}

PP.scenes.add("scene6", preload, create, update, destroy);