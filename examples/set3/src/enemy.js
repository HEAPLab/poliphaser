let img_enemy;
let enemy;

function preload_enemy(s) {
    // Carico l'immagine come spritesheets
    img_enemy = PP.assets.sprite.load_spritesheet(s, 
                        "assets/images/enemy.png", 72, 72);
}

function goto_game_over(s, obj1, obj2) {
    // Funzione di collisione tra nemico e giocatore:
    // in questo caso avvio la scena di game over
    PP.scenes.start("game_over");
}

function create_enemy(s, player,floor) {

    // Aggiungo un nemico come sprite, lo aggiungo alla fisica
    // e imposto i collider con floor e player
    enemy = PP.assets.sprite.add(s, img_enemy, 800, 500, 0.5, 1);
    PP.physics.add(s, enemy, PP.physics.type.DYNAMIC);
    PP.physics.add_collider(s, enemy, floor);
    PP.physics.add_collider_f(s, enemy, player, goto_game_over);

    // Velocità iniziale del nemico (verso dx)
    PP.physics.set_velocity_x(enemy, 100);

    // Aggiungo le animazioni walk dx/sx
    PP.assets.sprite.animation_add(enemy, "walk_left", 0, 3, 10, -1);
    PP.assets.sprite.animation_add(enemy, "walk_right", 12, 15, 10, -1);

    // Iniziamo andando a destra
    PP.assets.sprite.animation_play(enemy, "walk_right");

}

function update_enemy(s) {

    if(enemy.geometry.x >= 1000) {
        // Hit right boundary
        PP.physics.set_velocity_x(enemy, -100);
        PP.assets.sprite.animation_play(enemy, "walk_left");
    }
    else if (enemy.geometry.x <= 600) {
        // Hit left boundary
        PP.physics.set_velocity_x(enemy, 100);
        PP.assets.sprite.animation_play(enemy, "walk_right");
    }
}