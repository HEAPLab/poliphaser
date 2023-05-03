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
PP.game = {};

PP.debug = {
    assert : function(condition, message) {
        if (!condition) {
            throw new Error("Assertion failed: " + message);
        }
    }
}

/**
 * Create the game object and initialize the Phaser framework.
 * @function create
 * @memberof PP.game
 * @param config The object containing the game configuration.
 * @param {number} config.canvas_width     The width  of the canvas where the game will be rendered.
 * @param {number} config.canvas_height    The height of the canvas where the game will be rendered.
 * @param {string} config.canvas_id        The id of the HTML element containing the canvas.
 * @param {number} config.background_color Default background color used when no background is drawn, in RGB HEX format (for example 0x000000).
 * @param {array}  config.scenes           The list of objects representing the scenes of the game, created by the function `PP.scene.create`.
 * @return A game object. The user should not directly manipulate it, but pass it to other functions.
 */
PP.game.create = function (config) {
    PP.debug.assert(typeof config.canvas_width  === "number", "Parameter error: config.canvas_width is not a number.");
    PP.debug.assert(typeof config.canvas_height === "number", "Parameter error: config.canvas_height is not a number.");
    PP.debug.assert(typeof config.canvas_id     === "string", "Parameter error: config.canvas_id is not a string.");

    PP.debug.assert(config.canvas_width > 0, "Parameter error: config.canvas_width is not a positive number.");
}
