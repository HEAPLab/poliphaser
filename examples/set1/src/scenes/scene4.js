let step_length = 3;
let floor_height = 650;

let img_background;
let img_player;

let img_background_inst;
let player;

let cursor_keys;

function preload(s) {
    console.log("Executing preload() - SCENE 4");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    console.log("Executing create() - SCENE 4");

    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player              = PP.assets.image.add(s, img_player, 200, floor_height, 0, 1);

}

function update(s) {

    // E' stato premuto il tasto freccia sinistra e il giocatore è a destra del limite sinistro del quadro?
    if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT) && player.geometry.x >= 0) {
        console.log("Pressed left arrow.");
        player.geometry.flip_x = true;        // Volta il giocatore verso sinistra
        player.geometry.x     -= step_length; // Sposta il giocatore verso a sinistra
    }

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT) && player.geometry.x <= PP.game.config.canvas_width - player.geometry.display_width) {
        console.log("Pressed right arrow.");
        player.geometry.flip_x = false;        // Volta il giocatore verso destra
        player.geometry.x     += step_length; // Sposta il giocatore verso a destra
    }


}

function destroy(s) {
    console.log("Executing destroy() - SCENE 4");

}

PP.scenes.add("scene4", preload, create, update, destroy);