/**
 * My namespace.
 * @namespace
 */
let PP = {};

/**
 * My namespace.
 * @namespace
 * @memberof PP
 */
PP.game   = {};

/**
 * My namespace.
 * @namespace
 * @memberof PP
 */
PP.scenes = {};

PP.debug = {
    assert : function(condition, message) {
        if (!condition) {
            throw new Error("Assertion failed: " + message);
        }
    }
}

/**
 * Create the game object and initialize the Phaser framework.  This function must be called before PP.game.start is executed.
 * @function create
 * @memberof PP.game
 * @param config The object containing the game configuration.
 * @param {number} config.canvas_width     The width  of the canvas where the game will be rendered.
 * @param {number} config.canvas_height    The height of the canvas where the game will be rendered.
 * @param {string} config.canvas_id        The id of the HTML element containing the canvas.
 * @param {number} config.background_color Default background color used when no background is drawn, in RGB HEX format (for example 0x000000).
 * @return A game object. The user should not directly manipulate it, but pass it to other functions.
 */
PP.game.create = function (config) {
    PP.debug.assert(typeof config.canvas_width  === "number", "Parameter error: config.canvas_width is not a number.");
    PP.debug.assert(typeof config.canvas_height === "number", "Parameter error: config.canvas_height is not a number.");
    PP.debug.assert(typeof config.canvas_id     === "string", "Parameter error: config.canvas_id is not a string.");

    PP.debug.assert(config.canvas_width > 0, "Parameter error: config.canvas_width is not a positive number.");
}

/**
 * Start the game.  This function must be called after the creation of the game (PP.game.create) and the addition of the scenes.
 * @function start
 * @memberof PP.game
 * @param {string} scene_name The name of initial scene where to start the game.
 */
PP.game.start = function (scene_name) {
    
}

/**
 * Add a new scene to the game. This function must be called before PP.game.start is executed.
 * @function add
 * @memberof PP.scenes
 * @param {string}   scene_name       A unique name for the scene to be created. It can be an arbitrary string.
 * @param {function} preload_function The function executed at the beginning, when the scene is loaded. It should contain the loading of the assets (images, sounds, etc.).
 * @param {function} create_function  The function executed at the beginning, when the scene is created.
 * @param {function} update_function  The function executed at each frame.
 * @param {function} destroy_function The function executed when the scene is destroyed.
 */
PP.scenes.add = function(scene_name, preload_function, create_function, update_function, destroy_function) {

    PP.debug.assert(typeof scene_name === "string", "Parameter error: name is not a string.");

    PP.debug.assert(typeof preload_function    === "function", "Parameter error: load_function is not a function.");
    PP.debug.assert(typeof create_function  === "function", "Parameter error: create_function is not a function.");
    PP.debug.assert(typeof update_function  === "function", "Parameter error: update_function is not a function.");
    PP.debug.assert(typeof destroy_function === "function", "Parameter error: destroy_function is not a function.");

    if (PP.scenes.list === undefined) {
        PP.scenes.list = [];
    }

    PP.scenes.list.push(scene_name); // TODO Create and Push Scene object
}