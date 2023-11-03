let img_enemy;
let enemy;

function preload_enemy(s) {
    // Load dell'immagine della piattaforma
    img_enemy   = PP.assets.image.load(s, "assets/images/enemy.png");
}

function create_enemy(s, player) {

    // Piattaforma mobile
    enemy = PP.assets.image.add(s, img_enemy, 800, 300, 0, 0);
    PP.physics.add(s, enemy, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(enemy, true);
    PP.physics.set_velocity_x(enemy, 100);
}

function update_enemy(s) {

    // Aggiorno la velocita' della piattaforma mobile nel
    // caso in cui si trovi al limite destro o il limite sinistro
    // scelto (800 - 1200)

    if(enemy.geometry.x >= 2800) {
        PP.physics.set_velocity_x(enemy, -100);
    }
    else if(enemy.geometry.x <= 2000) {
        PP.physics.set_velocity_x(enemy, 100);
    }


}
