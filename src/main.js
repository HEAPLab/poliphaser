
var config = {
    canvas_width: 1024,
    canvas_height: 768,
    canvas_id: "game_area", // Specifica il div contenitore
    background_color: 0x000000,
    debug_mode: true,
    gravity_value: 200
};

PP.game.create(config);
PP.game.start("test1");