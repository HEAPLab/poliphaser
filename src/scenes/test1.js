let stepLength = 3;
let floorHeight = 600;

let img_background;
let img_background_instance;

let ss_player;
let player_instance;
let frame_count = 0;

function on_sprite_click() {
    alert("Clicked!");
}

function preload(s) {
    console.log("Executing preload()");
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    ss_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_scaled.png", 223, 190, 0, 4);

}

function create(s) {
    console.log("Executing create()");
    img_background_instance = PP.assets.image.add(s, img_background, 0, 0, 0, 0);

    let rectangle = PP.shapes.rectangle_add(s, 300, 500, 400, 200, "0xFF0000", 1);
    PP.shapes.destroy(rectangle);
    let arch = PP.shapes.arc_add(s, 300, 500, 30, 20, 187, false, "0x00F0F0", 1);

    player_instance = PP.assets.sprite.add(s, ss_player, 0, 0, 0, 0);
    PP.assets.sprite.animation_add(player_instance, "walk", 0, 10, 10, -1);
    PP.assets.sprite.animation_play(player_instance, "walk");

    PP.interactive.mouse.add(player_instance, "pointerdown", on_sprite_click);
    PP.interactive.mouse.remove_all(player_instance, "pointerdown");

}

function update(s) {
    console.log("Executing update()");

    if (frame_count++ == 100) {
        PP.assets.sprite.animation_stop(player_instance);
    }

}

function destroy(s) {
    console.log("Executing destroy()");
}

PP.scenes.add("test1", preload, create, update, destroy);
