let player_speed    = 100;
let jump_init_speed = 300;
let floor_height    = 620;

let curr_anim = "stop";

function configure_player_animations(s, player) {
    PP.assets.sprite.animation_add_list(player, "run", [6, 13, 20, 27, 34], 10, -1);    // Lista di frame, a 10 fps, inifito
    PP.assets.sprite.animation_add(player, "jump_up", 36, 36, 10, 0);
    PP.assets.sprite.animation_add(player, "jump_down", 42, 45, 10, 0);
    PP.assets.sprite.animation_add(player, "stop", 21, 21, 10, 0);
    PP.assets.sprite.animation_play(player, "stop");


    console.log(player.geometry)
}

function manage_player_update(s, player) {

    let next_anim = curr_anim;

    if(PP.interactive.kb.is_key_down(s, PP.key_codes.RIGHT)){
        PP.physics.set_velocity_x(player, player_speed);
        next_anim = "run";
    }
    else if(PP.interactive.kb.is_key_down(s, PP.key_codes.LEFT)){
        PP.physics.set_velocity_x(player, -player_speed);
        next_anim = "run";
    } else {
        PP.physics.set_velocity_x(player, 0);
        next_anim = "stop";
    }

    if(player.geometry.y>=floor_height-1) {
        if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
            PP.physics.set_velocity_y(player, -jump_init_speed);
        }
    }

    if(PP.physics.get_velocity_y(player) < 0) {
        next_anim = "jump_up";
    } else
    if(PP.physics.get_velocity_y(player) > 0) {
        next_anim = "jump_down";
    }

    if(next_anim != curr_anim) {
        PP.assets.sprite.animation_play(player, next_anim);
        curr_anim = next_anim;
    }

    if(PP.physics.get_velocity_x(player) < 0) {
        player.geometry.flip_x = true;
    }

    if(PP.physics.get_velocity_x(player) > 0) {
        player.geometry.flip_x = false;
    }

}
