let img_background;
let img_player;

let player;
let floor;
let txt_score;

function preload(s) {
    console.log("Executing preload() - SCENE");

}

function create(s) {
    console.log("Executing create() - SCENE");
    
    let rect1 = PP.shapes.rectangle_add(s, 100, 100, 200, 200, "0xFF0000", 1);
    let rect2 = PP.shapes.rectangle_add(s, 250, 250, 200, 200, "0x00FF00", 1);
    let rect3 = PP.shapes.rectangle_add(s, 400, 400, 200, 200, "0x0000FF", 1);

    let layer_rects = PP.layers.create(s);
    PP.layers.add_to_layer(layer_rects, rect1);
    PP.layers.add_to_layer(layer_rects, rect2);
    PP.layers.add_to_layer(layer_rects, rect3);


    let circle1 = PP.shapes.arc_add(s, 125, 125, 100, 0, 365, false, "0xDDDDDD", 1);
    let circle2 = PP.shapes.arc_add(s, 275, 275, 100, 0, 365, false, "0x777777", 1);
    let circle3 = PP.shapes.arc_add(s, 425, 425, 100, 0, 365, false, "0x333333", 1);
    
    let layer_circles = PP.layers.create(s);
    PP.layers.add_to_layer(layer_circles, circle1);
    PP.layers.add_to_layer(layer_circles, circle2);
    PP.layers.add_to_layer(layer_circles, circle3);

    PP.layers.set_z_index(layer_rects, 2);
    PP.layers.set_z_index(layer_circles, 1);

    rect3.visibility.alpha = 0.5;
    layer_rects.visibility.alpha = 0.5;
    rect3.visibility.alpha = 1;

    circle2.visibility.hidden = true;

}

function update(s) {
    // Azioni che vengono eseguite a ogni frame del gioco

}

function destroy(s) {
    console.log("Executing destroy() - SCENE");

}

PP.scenes.add("base", preload, create, update, destroy);