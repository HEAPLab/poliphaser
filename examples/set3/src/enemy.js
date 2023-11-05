let img_enemy;
let enemy;

function preload_enemy(s) {
    // Load dell'immagine della piattaforma
    img_enemy   = PP.assets.sprite.load_spritesheet(s, "assets/images/enemy.png", 72, 72);
}

function goto_game_over(s, obj1, obj2) {
    PP.scenes.start("game_over");
}

function create_enemy(s, player, floor) {

    // Piattaforma mobile
    enemy = PP.assets.sprite.add(s, img_enemy, 800, 500, 0, 0);
    PP.physics.add(s, enemy, PP.physics.type.DYNAMIC); 

    // Creiamo un collider tra pavimento e giocatore
    PP.physics.add_collider(s, enemy, floor);
    PP.physics.add_collider_f(s, enemy, player, goto_game_over);
    PP.physics.set_velocity_x(enemy, 100);

}

function update_enemy(s) {

    // Aggiorno la velocita' della piattaforma mobile nel
    // caso in cui si trovi al limite destro o il limite sinistro
    // scelto (800 - 1200)

    if(enemy.geometry.x <= 600) {
        PP.physics.set_velocity_x(enemy, 100);
    }
    else if(enemy.geometry.x >= 1000) {
        PP.physics.set_velocity_x(enemy, -100);
    }


}
