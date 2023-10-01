let step_length = 3;
let floor_height = 650;

let img_background;
let img_player;

let img_background_inst;
let player;

let cursor_keys;

function preload(s) {
    console.log("Executing preload() - SCENE 5");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    console.log("Executing create() - SCENE 5");

    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player              = PP.assets.image.add(s, img_player, 200, floor_height, 0, 1);

}

function update(s) {

    player_movement_manager(s);


}

function player_movement_manager(s) {

    // E' stato premuto il tasto freccia sinistra e il giocatore è a destra del limite sinistro del quadro?
    if(PP.interactive.kb.is_key_down(s, PP.KeyCodes.LEFT) && player.geometry.x >= 0) {
        console.log("Pressed left arrow.");
        player.geometry.flip_x = true;        // Volta il giocatore verso sinistra
        player.geometry.x     -= step_length; // Sposta il giocatore verso a sinistra
    }

    if(PP.interactive.kb.is_key_down(s, PP.KeyCodes.RIGHT) && player.geometry.x <= PP.game.config.canvas_width - player.geometry.display_width) {
        console.log("Pressed right arrow.");
        player.geometry.flip_x = false;        // Volta il giocatore verso destra
        player.geometry.x     += step_length; // Sposta il giocatore verso a destra
    }

    // E'stata premuta la barra spaziatrice e il giocatore è ancora al di sotto del limite
    // superiore del quadro?
    if(PP.interactive.kb.is_key_down(s, PP.KeyCodes.SPACE)  && player.geometry.y >= 0){
        console.log("Pressed spacebar.");
        player.geometry.y -= 10; // Spostamento verso l'alto (salto)
    } else {
        // Se non sto premendo il tasto e "sto ancora volando"
        // allora applico una "gravita' approssimativa"
        if(player.geometry.y <= floor_height) {
            player.geometry.y += 5; // Il player si sposta verso il basso
        }
    }

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 5");

}

PP.scenes.add("scene5", preload, create, update, destroy);