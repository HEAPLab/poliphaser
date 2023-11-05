let img_background;
let img_player;

let player;
let floor;
let txt_score;

function preload(s) {
    console.log("Executing preload() - SCENE");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 223, 190);

    preload_player(s);
    preload_platforms(s);
    preload_mushrooms(s);
    preload_enemy(s);
}

function collider_test(s,a,b) {
    console.log("Player colliding with the box!");
}

function create(s) {
    console.log("Executing create() - SCENE");

    // Inseriamo background e giocatore
    PP.assets.tilesprite.add(s, img_background, 0, 0, 10000, 800, 0, 0);

    player = PP.assets.sprite.add(s, img_player, 150, 620, 0.5, 1);
    // Aggiungiamo il giocatore alla fisica come entità dinamica
    PP.physics.add(s, player, PP.physics.type.DYNAMIC); 


    // Creiamo un pavimento "trasparente"
    floor = PP.shapes.rectangle_add(s, 640, 620, 10000, 1, "0x000000", 0);
    // Aggiungiamo il pavimento alla fisica come entità statica
    PP.physics.add(s, floor, PP.physics.type.STATIC); 

    // Creiamo un collider tra pavimento e giocatore
    PP.physics.add_collider(s, player, floor);

    configure_player_animations(s, player); // Impostazione animazioni giocatore
    create_platforms(s, player);            // Creazione piattaforme
    create_mushrooms(s, player);            // Creazione funghetti
    create_enemy(s, player, floor);

    // Creo una variabile per lo "score" della scena
    PP.gameState.set_variable("score", 0);
    txt_score = PP.shapes.text_styled_add(s, 10, 10, "Score: 0", 30, "Helvetica", "normal", "0xFFFFFF", null);

    txt_score.tile_geometry.scroll_factor_x = 0;
    txt_score.tile_geometry.scroll_factor_y = 0;

    // Follow
    PP.camera.start_follow(s, player, 0, 220);

    // Collision rectangle
    //PP.physics.set_collision_rectangle(player, 100, 160, 80, 10); 
    //PP.physics.set_collision_circle(player, 80, 50, 10); 


}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

    manage_player_update(s, player);    // Posizione del giocatore e animazioni
    update_platforms(s);                // Movimento piattaforme
    update_mushrooms(s);                // Azioni funghetti
    manage_player_weapons(s, player);
    update_enemy(s, player);

    // Aggiorno il punteggio visualizzato:
    PP.shapes.text_change(txt_score, "Score: " + PP.gameState.get_variable("score"));

}

function destroy(s) {
    console.log("Executing destroy() - SCENE");

}

PP.scenes.add("base", preload, create, update, destroy);