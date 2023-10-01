let step_length = 2;
let floor_height = 650;

let img_background;
let ss_player;

let img_background_inst;
let player;

let player_is_moving = false;

function preload(s) {
    console.log("Executing preload() - SCENE 7");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");

    // Carico lo spritesheet del giocatore
    ss_player      = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 223, 190);

} 

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 7");

    // Posizioniamo gli elementi nella scena
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player     = PP.assets.sprite.add(s, ss_player, 100, floor_height, 0.5, 1);
    
    PP.assets.sprite.animation_add_list(player, "run", [6, 13, 20, 27, 34], 10, -1);    // Lista di frame, a 10 fps, inifito
}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco


    // E' stato premuto il tasto freccia sinistra e il giocatore è a destra del limite sinistro del quadro?
    if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT) && player.geometry.x >= 0) {
        player.geometry.flip_x = true;        // Volta il giocatore verso sinistra
        player.geometry.x     -= step_length; // Sposta il giocatore verso a sinistra

        if(!player_is_moving) {
            // Avviamo l'animazione solo se essa non è già attiva
            player_is_moving  = true;
            PP.assets.sprite.animation_play(player, "run");
        }
    }
    else if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT) && player.geometry.x <= PP.game.config.canvas_width - player.geometry.display_width) {
        player.geometry.flip_x = false;       // Volta il giocatore verso destra
        player.geometry.x     += step_length; // Sposta il giocatore verso a destra

        if(!player_is_moving) {
            // Avviamo l'animazione solo se essa non è già attiva
            player_is_moving  = true;
            PP.assets.sprite.animation_play(player, "run");
        }
    }
    else {

        // Se non è premuto alcun tasto, allora disattiviamo l'animazione
        player_is_moving  = false;
        PP.assets.sprite.animation_stop(player); // Ferma al frame corrente
    }

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 7");

}

PP.scenes.add("scene7", preload, create, update, destroy);