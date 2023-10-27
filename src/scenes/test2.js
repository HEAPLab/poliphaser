let img_background;
let img_background_instance;


function preload(s) {
    console.log("Executing preload() - SCENE 2");
    img_background = PP.assets.image.load(s, "assets/images/background.png");
}

function create(s) {
    console.log("Executing create() - SCENE 2");
    img_background_instance = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    
    console.log(PP.gameState.get_Variable("test1"));
    PP.gameState.set_Variable("test1", "hi");

    PP.shapes.text_add(s, 50,80,"HI " + PP.gameState.get_Variable("test1"));

}

function update(s) {
    console.log("Executing update() - SCENE 2");
    console.log(PP.gameState.get_Variable("test1"));

}

function destroy(s) {
    console.log("Executing destroy() - SCENE 2");
}

PP.scenes.add("test2", preload, create, update, destroy);
