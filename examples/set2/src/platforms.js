let img_platform;
let platform_2;

function preload_platforms(s) {
    // Load dell'immagine della piattaforma
    img_platform   = PP.assets.image.load(s, "assets/images/platform.png");
}

function collision_platform(s, player, platform) {
    if(player.geometry.x >= platform.geometry.x) {
        player.is_on_platform = true;
    }
}

function create_platforms(s, player) {

    // Piattaforma fissa
    let platform = PP.assets.image.add(s, img_platform, 400, 450, 0, 0);
    PP.physics.add(s, platform, PP.physics.type.STATIC); 
    PP.physics.add_collider_f(s, player, platform, collision_platform);

    // Piattaforma mobile
    platform_2 = PP.assets.image.add(s, img_platform, 800, 300, 0, 0);
    PP.physics.add(s, platform_2, PP.physics.type.DYNAMIC); 
    PP.physics.set_immovable(platform_2, true);
    PP.physics.set_allow_gravity(platform_2, false);    
    PP.physics.add_collider_f(s, player, platform_2, collision_platform);
    PP.physics.set_velocity_x(platform_2, 100);

}

function update_platforms(s) {

    if(platform_2.geometry.x >= 1200) {
        PP.physics.set_velocity_x(platform_2, -100);
    }

    if(platform_2.geometry.x <= 800) {
        PP.physics.set_velocity_x(platform_2, 100);
    }


}