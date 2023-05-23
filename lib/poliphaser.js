const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * The main namespace of FunPhaser.
 * @namespace
 */
let PP = {};

/**
 * The namespace containing the main functions of the game engine.
 * @namespace
 * @memberof PP
 */
PP.game   = {};

/**
 * The namespace containing functions for the scene management.
 * @namespace
 * @memberof PP
 */
PP.scenes = {};

/**
 * The namespace containing functions to load and manage assets
 * @namespace
 * @memberof PP
 */
PP.assets = {
    list_images_id : []
};

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
    
    PP.debug.assert(PP.scenes.list, "You need to add at least one scene!");

    PP.game.config = config;    // Save config for future use

    // Let's create the Phaser config and Phase Game object.
    const phaser_config = {
        type: Phaser.AUTO,
        width: config.canvas_width,
        height: config.canvas_height,
        backgroundColor: config.background_color,
        scene: PP.scenes.list,
        pixelArt: true,
        parent: config.canvas_id
    };
    
    PP.game.ph_obj = new Phaser.Game(phaser_config);
}

/**
 * Start the game.  This function must be called after the creation of the game (PP.game.create) and the addition of the scenes.
 * @function start
 * @memberof PP.game
 * @param {string} scene_name The name of initial scene where to start the game.
 */
PP.game.start = function (scene_name) {
    PP.debug.assert(typeof scene_name === "string", "Parameter error: scene_name is not a string.");

    PP.debug.assert(PP.scenes.list_names.includes(scene_name), "Trying to start a non-existent scene: " + scene_name);

    PP.game.ph_obj.scene.start(scene_name);
}

/**
 * Add a new scene to the game. This function must be called before PP.game.start is executed.
 * @function add
 * @memberof PP.scenes
 * @param {string}   scene_name       A unique name for the scene to be created. It can be an arbitrary string.
 * @param {function} preload_function The function executed at the beginning, when the scene is loaded. It should contain the loading of the assets (images, sounds, etc.) and initialization stuff.
 * @param {function} create_function  The function executed at the beginning, when the scene is created.
 * @param {function} update_function  The function executed at each frame.
 * @param {function} destroy_function The function executed when the scene is destroyed.
 */
PP.scenes.add = function(scene_name, preload_function, create_function, update_function, destroy_function) {

    PP.debug.assert(typeof scene_name === "string", "Parameter error: scene_name is not a string.");

    PP.debug.assert(typeof preload_function === "function", "Parameter error: load_function is not a function.");
    PP.debug.assert(typeof create_function  === "function", "Parameter error: create_function is not a function.");
    PP.debug.assert(typeof update_function  === "function", "Parameter error: update_function is not a function.");
    PP.debug.assert(typeof destroy_function === "function", "Parameter error: destroy_function is not a function.");

    if (PP.scenes.list === undefined) {
        PP.scenes.list = [];
        PP.scenes.list_names = [];
    }

    // Check that the name of the scene is not duplicated
    PP.debug.assert(!PP.scenes.list_names.includes(scene_name), "Duplicated scene name: " + scene_name);

    // If not, add the name to the list of names
    PP.scenes.list_names.push(scene_name);

    // Now it's time to create the Phaser scene object
    let scene = new Phaser.Scene(scene_name);
    scene.preload = ()=>{preload_function(scene);};
    scene.create  = ()=>{create_function(scene);};
    scene.update  = ()=>{update_function(scene);};
    scene.destroy = ()=>{destroy_function(scene);};

    PP.scenes.list.push(scene);

}

/**
 * Load a new image.
 * @function load_image
 * @memberof PP.assets
 * @param {string}   image_path       A path of the image to load. It can be relative to the current page or a full URL.
 * @return An image object.
 */
PP.assets.load_image = function(scene, image_path) {
    PP.debug.assert(typeof scene      === "object", "Parameter error: scene should be a scene object.");
    PP.debug.assert(typeof image_path === "string", "Parameter error: image_path should be a string.");

    let url_hash = cyrb53(image_path);  // This is used as ID

    if(PP.assets.list_images_id.includes(url_hash)) {
        console.warn('WARNING: you are trying to load multiple times the same image ('+image_path+'). Aborting this load request.');
        return {id: url_hash};
    }

    PP.assets.list_images_id.push(url_hash);

    scene.load.image(url_hash, image_path);
    return {id: url_hash};
}