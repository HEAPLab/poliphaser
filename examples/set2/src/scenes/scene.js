let img_background;
let img_player;

let player;
let floor;
let box;

function preload(s) {
    console.log("Executing preload() - SCENE 1");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");
}

function collider_test(s,a,b) {
    console.log("Player colliding with the box!");
}

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 1");
    
    PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player = PP.assets.image.add(s, img_player, 150, 630, 0.5, 1);
    
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 

    PP.physics.set_velocity_x(player, 100);
    PP.physics.set_velocity_y(player, -300);

    //PP.physics.set_collide_world_bounds(player, true);

    floor = PP.shapes.rectangle_add(s, 640, 650, 1280, 20, "0x000000", 1);
    PP.physics.add(s, floor, PP.physics.type.STATIC); 

    box = PP.shapes.rectangle_add(s, 800, 500, 100, 100, "0x0000FF", 1);
    PP.physics.add(s, box, PP.physics.type.DYNAMIC); 


    PP.physics.add_collider(s, player, floor); 
    PP.physics.add_collider(s, box, floor); 


    PP.physics.add_collider_f(s, player, box, collider_test); 

    PP.physics.set_bounce_y(player, 0.5); 


}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 1");

}

PP.scenes.add("scene", preload, create, update, destroy);