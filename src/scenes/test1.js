let stepLength = 3;
let floorHeight = 600;

let img_background;
let img_background_instance;

let ss_player;


function preload(s) {
    console.log("Executing preload()");
    img_background = PP.assets.load_image(s, "assets/images/background.png");
    ss_player = PP.assets.load_spritesheet(s, "assets/images/spritesheet_scaled.png", 223, 190, 0, 4);

}


function create(s) {
    console.log("Executing create()");
    img_background_instance = PP.assets.add_image(s, img_background, 0, 0, 0, 0);
}

function update(s) {
    console.log("Executing update()");
}

function destroy(s) {
    console.log("Executing destroy()");
}

PP.scenes.add("test1", preload, create, update, destroy);
