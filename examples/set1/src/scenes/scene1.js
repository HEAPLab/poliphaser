let step_length = 2;
let floor_height = 650;

let img_background;
let img_player;

let img_background_inst;
let img_player_inst;

function preload(s) {
    console.log("Executing preload() - SCENE 1");
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    console.log("Executing create() - SCENE 1");
    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);

    img_player_inst     = PP.assets.image.add(s, img_player, 0, floor_height, 0.5, 1);

    img_player_inst.geometry.scale_x=0.5;
    img_player_inst.geometry.scale_y=0.5;

}

function update(s) {
    console.log("Executing update() - SCENE 1");
    img_player_inst.geometry.x += step_length;

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 1");

}

PP.scenes.add("scene1", preload, create, update, destroy);