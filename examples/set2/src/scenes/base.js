let img_background;
let img_player;

let player;
let floor;
let box;

function preload(s) {
    console.log("Executing preload() - SCENE");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 223, 190);
}

function collider_test(s,a,b) {
    console.log("Player colliding with the box!");
}

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE");
    
    PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player = PP.assets.sprite.add(s, img_player, 150, 620, 0.5, 1);
    
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 


    floor = PP.shapes.rectangle_add(s, 640, 620, 1280, 1, "0x000000", 0);
    PP.physics.add(s, floor, PP.physics.type.STATIC); 

    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player);

}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

    manage_player_update(s, player);

}

function destroy(s) {
    console.log("Executing destroy() - SCENE");

}

PP.scenes.add("base", preload, create, update, destroy);