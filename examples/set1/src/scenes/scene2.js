let step_length = 4;
let floor_height = 650;

let img_background;
let img_player;

let img_background_inst;
let img_player_inst;

function preload(s) {
    console.log("Executing preload() - SCENE 2");
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    console.log("Executing create() - SCENE 2");
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);

    img_player_inst     = PP.assets.image.add(s, img_player, 200, floor_height, 0.5, 1);

    img_player_inst.geometry.scale_x=0.5;
    img_player_inst.geometry.scale_y=0.5;

}

function update(s) {
        img_player_inst.geometry.x += step_length;

        // Estremo destro del riquadro di gioco
        if (img_player_inst.geometry.x >= PP.game.config.canvas_width - img_player_inst.geometry.display_width/2){
            img_player_inst.geometry.flip_x = true; // Inverte l'orientamento dell'immagine del giocatore rispetto all'asse x
            step_length = step_length * -1; // Inverte la direzione di moto
        }
        // Estremo sinistro del riquadro di gioco
        if (img_player_inst.geometry.x <= img_player_inst.geometry.display_width/2){
            img_player_inst.geometry.flip_x = false; // Ripristina l'orientamento dell'immagine del giocatore rispetto all'asse x
            step_length = step_length * -1; // Ripristina la direzione di moto
        }

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 2");

}

PP.scenes.add("scene2", preload, create, update, destroy);