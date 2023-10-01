let step_length = 2;
let floor_height = 650;

let img_background;
let ss_player;

let img_background_inst;
let player;

let player_is_moving = false;
let player_is_jumping = false;
let player_is_falling = false;

function preload(s) {
    console.log("Executing preload() - SCENE 8");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");

    // Carico lo spritesheet del giocatore
    ss_player      = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_player.png", 223, 190);

} 

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 8");

    // Posizioniamo gli elementi nella scena
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player     = PP.assets.sprite.add(s, ss_player, 100, floor_height, 0.5, 1);
    
    PP.assets.sprite.animation_add_list(player, "run", [6, 13, 20, 27, 34], 10, -1);    // Lista di frame, a 10 fps, inifito
    PP.assets.sprite.animation_add(player, "jump_up", 36, 36, 10, 0);
    PP.assets.sprite.animation_add(player, "jump_down", 42, 45, 10, 0);
    PP.assets.sprite.animation_add(player, "stop", 21, 21, 10, 0);
    PP.assets.sprite.animation_play(player, "stop");


}

function update(s) {

    let should_stop = true;

    // Azioni che vengono eseguite a ogni frame del gioco

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)  && player.geometry.y >= 0){
        should_stop = false;
        if(!player_is_jumping) {
            // Avviamo l'animazione solo se essa non è già attiva
            player_is_jumping = true;
            player_is_moving  = true;
            PP.assets.sprite.animation_play(player, "jump_up");
        }
        player.geometry.y -= 10; // Spostamento verso l'alto (salto)
    } else {
        // Se non sto premendo il tasto e "sto ancora volando"
        // allora applico una "gravita' approssimativa"
        if(player.geometry.y <= floor_height) {
            player.geometry.y += 5; // Il player si sposta verso il basso
            should_stop = false;

            if(!player_is_falling) {
                // Avviamo l'animazione solo se essa non è già attiva
                player_is_falling  = true;
                player_is_moving  = true;
                PP.assets.sprite.animation_play(player, "jump_down");
            }    
        }
    }


    // E' stato premuto il tasto freccia sinistra e il giocatore è a destra del limite sinistro del quadro?
    if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT) && player.geometry.x >= 0) {
        player.geometry.flip_x = true;        // Volta il giocatore verso sinistra
        player.geometry.x     -= step_length; // Sposta il giocatore verso a sinistra
        should_stop = false;

        if(!player_is_moving) {
            // Avviamo l'animazione solo se essa non è già attiva
            player_is_moving  = true;
            PP.assets.sprite.animation_play(player, "run");
        }
    }
    else if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT) && player.geometry.x <= PP.game.config.canvas_width - player.geometry.display_width) {
        player.geometry.flip_x = false;       // Volta il giocatore verso destra
        player.geometry.x     += step_length; // Sposta il giocatore verso a destra
        should_stop = false;

        if(!player_is_moving) {
            // Avviamo l'animazione solo se essa non è già attiva
            player_is_moving  = true;
            PP.assets.sprite.animation_play(player, "run");
        }
    }
    
    if(should_stop) {
        // Se non è premuto alcun tasto, allora disattiviamo l'animazione
        player_is_moving  = false;
        player_is_jumping = false;
        player_is_falling = false;
        PP.assets.sprite.animation_play(player, "stop");
    }



}

function destroy(s) {
    console.log("Executing destroy() - SCENE 8");

}

PP.scenes.add("scene8", preload, create, update, destroy);