//
// File di esempio per la fisica
//
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
    // Funzione di esempio per quando avviene una collisione
    console.log("Player colliding with the box!");
}

function create(s) {
    console.log("Executing create() - SCENE 1");
    
    PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player = PP.assets.image.add(s, img_player, 150, 630, 0.5, 1);

    // Ogni elemento che vogliamo gestire con la fisica va "aggiunto" alla fisica
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 

    // Imposto una velocità sugli assi x e y al giocatore
    PP.physics.set_velocity_x(player, 100);
    PP.physics.set_velocity_y(player, -300);

    // Con la prossima funzione posso impostare che il giocatore collida con il bordo
    // della scena: 
    // PP.physics.set_collide_world_bounds(player, true);

    // Creo il pavimento e lo aggiuno alla fisica
    floor = PP.shapes.rectangle_add(s, 640, 650, 1280, 20, "0x000000", 1);
    PP.physics.add(s, floor, PP.physics.type.STATIC); 

    // Creo un box spostabile dal giocatore
    box = PP.shapes.rectangle_add(s, 800, 500, 100, 100, "0x0000FF", 1);
    PP.physics.add(s, box, PP.physics.type.DYNAMIC); 

    // Aggiungo i collider per consentire le collisioni tra player e floor, box e floor
    PP.physics.add_collider(s, player, floor); 
    PP.physics.add_collider(s, box, floor); 

    // Aggiungo anche il collider tra player e box
    PP.physics.add_collider_f(s, player, box, collider_test); 

    // Imposto il bounce per quando il giocatore colpisce il suolo
    PP.physics.set_bounce_y(player, 0.5); 
}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 1");

}

PP.scenes.add("scene", preload, create, update, destroy);