let img_background;
let img_background_instance;


function preload(s) {
    console.log("Executing preload() - SCENE 2");
    img_background = PP.assets.image.load(s, "assets/images/background.png");
}

function create(s) {
    console.log("Executing create() - SCENE 2");
    img_background_instance = PP.assets.image.add(s, img_background, 0, 0, 0, 0);

}

function update(s) {
    console.log("Executing update() - SCENE 2");

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 2");
}

PP.scenes.add("test2", preload, create, update, destroy);
