let step_length = 2;
let floor_height = 650;

let img_background_1;
let img_background_2;
let img_background_3;
let img_background_4;
let img_background_5;
let img_background_6;
let img_background_7;
let img_background_8;
let img_player;

let player;
let ts_background_8;
let ts_background_7;
let ts_background_6;
let ts_background_5;
let ts_background_4;
let ts_background_3;
let ts_background_2;
let ts_background_1;

function preload(s) {
    console.log("Executing preload() - SCENE 10");

    // Carichiamo gli asset grafici

    // Uso 8 variabili, ma un array sarebbe stato meglio (esercizio per casa: come fare?)
    img_background_1 = PP.assets.image.load(s, "assets/images/parallax/layer_01.png");
    img_background_2 = PP.assets.image.load(s, "assets/images/parallax/layer_02.png");
    img_background_3 = PP.assets.image.load(s, "assets/images/parallax/layer_03.png");
    img_background_4 = PP.assets.image.load(s, "assets/images/parallax/layer_04.png");
    img_background_5 = PP.assets.image.load(s, "assets/images/parallax/layer_05.png");
    img_background_6 = PP.assets.image.load(s, "assets/images/parallax/layer_06.png");
    img_background_7 = PP.assets.image.load(s, "assets/images/parallax/layer_07.png");
    img_background_8 = PP.assets.image.load(s, "assets/images/parallax/layer_08.png");

    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    // Qui le istruzioni su cosa creare e dove nel mondo di gioco
    console.log("Executing create() - SCENE 10");

    // Visualizzo i layer "statici" del background
    ts_background_8 = PP.assets.tilesprite.add(s, img_background_8, 0, 0, 1280, 800, 0, 0);
    ts_background_7 = PP.assets.tilesprite.add(s, img_background_7, 0, 0, 1280, 800, 0, 0);
    
    // Ora i layer che si sposteranno con il giocatore
    ts_background_6 = PP.assets.tilesprite.add(s, img_background_6, 0, 0, 1280, 800, 0, 0);
    ts_background_5 = PP.assets.tilesprite.add(s, img_background_5, 0, 0, 1280, 800, 0, 0);
    ts_background_4 = PP.assets.tilesprite.add(s, img_background_4, 0, 0, 1280, 800, 0, 0);
    ts_background_3 = PP.assets.tilesprite.add(s, img_background_3, 0, 0, 1280, 800, 0, 0);
    ts_background_2 = PP.assets.tilesprite.add(s, img_background_2, 0, 0, 1280, 800, 0, 0);
    ts_background_1 = PP.assets.tilesprite.add(s, img_background_1, 0, 0, 1280, 800, 0, 0);

    // Disabilitiamo il tilesprite scroll factor per tutti i background (lo gestiremo manualmente)
    ts_background_8.tile_geometry.scroll_factor_x = 0;
    ts_background_7.tile_geometry.scroll_factor_x = 0;
    ts_background_6.tile_geometry.scroll_factor_x = 0;
    ts_background_5.tile_geometry.scroll_factor_x = 0;
    ts_background_4.tile_geometry.scroll_factor_x = 0;
    ts_background_3.tile_geometry.scroll_factor_x = 0;
    ts_background_2.tile_geometry.scroll_factor_x = 0;
    ts_background_1.tile_geometry.scroll_factor_x = 0;

    player     = PP.assets.image.add(s, img_player, 640, floor_height, 0.5, 1);   // Posizionato in (0,650) con pivot in basso al centro

    PP.camera.start_follow(s, player, 0, 250);

}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

    ts_background_6.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.05; //imporstiamo  lo sfondo in foreground in modo che possa muoversi
    ts_background_5.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.1; //imporstiamo  lo sfondo in foreground in modo che possa muoversi
    ts_background_4.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.2; //imporstiamo  lo sfondo in foreground in modo che possa muoversi
    ts_background_3.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.3; //imporstiamo  lo sfondo in foreground in modo che possa muoversi
    ts_background_2.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.4; //imporstiamo  lo sfondo in foreground in modo che possa muoversi
    ts_background_1.tile_geometry.x = PP.camera.get_scroll_x(s) * 0.5; //imporstiamo  lo sfondo in foreground in modo che possa muoversi


    // E' stato premuto il tasto freccia sinistra e il giocatore è a destra del limite sinistro del quadro?
    if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
        player.geometry.flip_x = true;        // Volta il giocatore verso sinistra
        player.geometry.x     -= step_length; // Sposta il giocatore verso a sinistra
    }

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        player.geometry.flip_x = false;        // Volta il giocatore verso destra
        player.geometry.x     += step_length; // Sposta il giocatore verso a destra
    }

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 10");

}

PP.scenes.add("scene10", preload, create, update, destroy);