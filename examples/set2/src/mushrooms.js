let img_mushroom_1;
let img_mushroom_2;

function preload_mushrooms(s) {
    // Load delle immagini del funghetto
    img_mushroom_1   = PP.assets.image.load(s, "assets/images/mushroom_1.png");
    img_mushroom_2   = PP.assets.image.load(s, "assets/images/mushroom_2.png");
}

function collision_mushroom(s, player, mushroom) {
    PP.assets.destroy(mushroom);

    let prev_score = PP.gameState.get_Variable("score");
    PP.gameState.set_Variable("score", prev_score+10);
}

function create_mushrooms(s, player) {

    // Creazione di 10 funghetti
    for (let i=0; i<10; i++) {
        let mush_img;
        if(Math.random() < 0.5) {
            mush_img = img_mushroom_1;
        } else {
            mush_img = img_mushroom_2;
        }
        let mushroom = PP.assets.image.add(s, mush_img, 300+200*i, 580, 0, 0);
        PP.physics.add(s, mushroom, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(s, player, mushroom, collision_mushroom);
    }


}

function update_mushrooms(s) {
    
}
