let stepLength = 3;
let floorHeight = 600;

let img_background;

function preload(s) {
    console.log("Executing preload()");
    img_background = PP.assets.load_image(s, "assets/images/background.png");
}


function create(s) {
    console.log("Executing create()");
    s.background0 = s.add.image(0, 0, img_background.id);
    s.background0.setOrigin(0,0);

}

function update(s) {
    console.log("Executing update()");
}

function destroy(s) {
    console.log("Executing destroy()");
}

PP.scenes.add("test1", preload, create, update, destroy);
