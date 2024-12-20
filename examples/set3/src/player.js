let player_speed    = 100;
let jump_init_speed = 300;
let floor_height    = 620;

let curr_anim = "stop"; // Questa variabile contiene l'animazione corrente

let img_shuriken;

function preload_player(s) {
    img_shuriken = PP.assets.image.load(s, "assets/images/shuriken.png");
}

function configure_player_animations(s, player) {
    // Configuro le animazioni secondo lo spritesheet
    PP.assets.sprite.animation_add_list(player, "run", [6, 13, 20, 27, 34], 10, -1);    // Lista di frame, a 10 fps, inifito
    PP.assets.sprite.animation_add(player, "jump_up", 36, 36, 10, 0);
    PP.assets.sprite.animation_add(player, "jump_down", 42, 45, 10, 0);
    PP.assets.sprite.animation_add(player, "stop", 21, 21, 10, 0);
    PP.assets.sprite.animation_play(player, "stop");

}

function manage_player_update(s, player) {
    // Questa funzione e' chiamata ad ogni frame dalla update()


    // Creo una variabile che conterra' l'animazione futura
    // per poter verificare se cambia dalla attuale
    let next_anim = curr_anim;

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)) {
        // Se e' premuto il tasto destro...
        PP.physics.set_velocity_x(player, player_speed);
        next_anim = "run";
    }
    else if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)) {
        // Se e' premuto il tasto sinistro...
        PP.physics.set_velocity_x(player, -player_speed);
        next_anim = "run";
    } else {
        // Se non e' premuto alcun tasto...
        PP.physics.set_velocity_x(player, 0);
        next_anim = "stop";
    }

    if(player.geometry.y>=floor_height-1 || player.is_on_platform) {
        // Se mi trovo sul pavimento OPPURE su una piattaforma...

        if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
            // ... e premo il tasto spazio, allo salto
            PP.physics.set_velocity_y(player, -jump_init_speed);
        }

        // Non gestisco qui le animazioni del salto, ma piu' avanti
    }

    player.is_on_platform = false;  // Resetto il flag che viene messo a true quando il giocatore 
                                    // si trova sulla piattaforma

    // Le animazioni del salto vengono gestite in base alla velocita'
    // verticale
    if(PP.physics.get_velocity_y(player) < 0) {
        next_anim = "jump_up";
    }
    else if(PP.physics.get_velocity_y(player) > 0) {
        next_anim = "jump_down";
    }

    // Nota: non gestisco il caso == 0, perche' in quel caso l'animazione
    // e' quella del movimento scelta prima.


    // Ora verifico l'animazione scelta:
    // - se e' uguale a quella attuale, non faccio niente
    // - se e' cambiata, la applico e aggiorno curr_anim
    if(next_anim != curr_anim) {
        PP.assets.sprite.animation_play(player, next_anim);
        curr_anim = next_anim;
    }

    // Logica per specchiare il giocatore:
    if (PP.physics.get_velocity_x(player) < 0) {
        player.geometry.flip_x = true;
    }
    else if (PP.physics.get_velocity_x(player) > 0) {
        player.geometry.flip_x = false;
    }

}

let weapon_disabled = false;

function reenable_weapon(s) {
    // Funzione che viene chiamata allo scadere del timer
    weapon_disabled = false;
}

function manage_player_weapon(s, player) {

    if(weapon_disabled == true) {
        // Se l'arma e' disabilitata (v. timer)...
        
        return; // Esce immediatamente dalla funzione senza eseguire
                // il codice sottostante
    }

    if (PP.interactive.kb.is_key_down(s, PP.key_codes.F)) {

        let offset = 70;
        let velocity = 1000;

        if(player.geometry.flip_x) {    // == true
            // Inverto offset e velocita' dello
            // shuriken se il giocatore guarda verso sx
            offset   = - offset;
            velocity = - velocity;
        }

        // Creo un nuovo shuriken (immagine)
        let shuriken = PP.assets.image.add(s, img_shuriken,
                                player.geometry.x + offset, player.geometry.y - 70,
                                0.5, 0.5);
        
        PP.physics.add(s, shuriken, PP.physics.type.DYNAMIC);
        PP.physics.set_rotation(shuriken, 360);
        PP.physics.set_allow_gravity(shuriken, false);
        PP.physics.set_velocity_x(shuriken, velocity);

        PP.physics.add_collider_f(s, shuriken, enemy, hit_enemy);

        weapon_disabled = true;

        // Tra 500 secondi riporto weapon disabled a false
        PP.timers.add_timer(s, 500, reenable_weapon, false);
    }
}

function hit_enemy(s, obj1, obj2) {
    // Se lo shuriken colpisce il nemico, distruggo entrambi
    PP.assets.destroy(obj1);
    PP.assets.destroy(obj2);
}