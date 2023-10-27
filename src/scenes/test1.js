let stepLength = 3;
let floorHeight = 600;

let img_background;
let img_background_instance;

let ss_player;
let player_instance;
let frame_count = 0;

let txt;

function on_sprite_click() {
    PP.scenes.start("test2");
}

function preload(s) {
    console.log("Executing preload() - SCENE 1");
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    ss_player = PP.assets.sprite.load_spritesheet(s, "assets/images/spritesheet_scaled.png", 223, 190, 0, 10);

}

function create(s) {
    console.log("Executing create() - SCENE 1");
    img_background_instance = PP.assets.image.add(s, img_background, 0, 0, 0, 0);

    let rectangle = PP.shapes.rectangle_add(s, 300, 500, 400, 200, "0xFF0000", 1);
    PP.shapes.destroy(rectangle);
    let arc = PP.shapes.arc_add(s, 300, 500, 30, 20, 187, false, "0x00F0F0", 1);

    PP.shapes.set_stroke(arc, 5, "0x00FF00", 1);

    PP.shapes.polygon_add(s, 300, 300, [0, 0, 100, 0, 100, 100, 0, 100], "0xFFFFFF", 0.5);


    player_instance = PP.assets.sprite.add(s, ss_player, 0, 0, 0, 0);
    PP.assets.sprite.animation_add(player_instance, "walk", 0, 10, 10, -1);
    PP.assets.sprite.animation_play(player_instance, "walk");

    PP.interactive.mouse.add(player_instance, "pointerdown", on_sprite_click);
    //PP.interactive.mouse.remove_all(player_instance, "pointerdown");


    PP.gameState.set_Variable("test1", {"hi":2});

    
    //txt = PP.shapes.text_styled_add(s, 100,100,"Nice to meet you", 600, "Times", "normal", "0X00FF00", "0X0000FF");
    //arc.scroll_factor_x = 0;

    console.log(PP.timers.getTime(s));

    PP.timers.add_timer(s, 1500, sayHI, false);
}

function sayHI(s){
    console.log("HI");
}

function update(s) {

    if(PP.interactive.kb.is_key_up(s, PP.key_codes.SPACE)) {
        /*console.log("PRESSING SPACE!");
        console.log(PP.gameState.get_Variable("test1"));*/
        return;
    }
    console.log("Executing update() - SCENE 1");

    img_background_instance.geometry.x++;
    player_instance.geometry.y++;

    if (frame_count++ == 100) {
        PP.assets.sprite.animation_stop(player_instance);
    }

    //PP.shapes.changeText(txt, "HI AGAIN");

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 1");
}

PP.scenes.add("test1", preload, create, update, destroy);
