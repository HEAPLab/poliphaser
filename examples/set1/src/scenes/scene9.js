let step_length = 2;
let floor_height = 650;

let img_background;
let img_player;
let img_clouds;

let img_background_inst;
let player;
let ts_clouds;

function preload(s) {
    console.log("Executing preload() - SCENE 9");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/sky-background.png");
    img_clouds     = PP.assets.image.load(s, "assets/images/clouds-background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 9");

    // Posizioniamo gli elementi nella scena
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player     = PP.assets.image.add(s, img_player, 200, floor_height, 0.5, 1);   // Posizionato in (0,650) con pivot in basso al centro

    ts_clouds = PP.assets.tilesprite.add(s, img_clouds, 0, 0, 1280, 800, 0, 0);


}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco
    console.log("Executing update() - SCENE 9");

    ts_clouds.tile_geometry.x += 1;

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 9");

}

PP.scenes.add("scene9", preload, create, update, destroy);