let step_length_x = 3;
let step_length_y = 3;
let floor_height = 650;

let img_background;
let img_player;

let img_background_inst;
let player;

function preload(s) {
    console.log("Executing preload() - SCENE 3");

    // Carichiamo gli asset grafici
    img_background = PP.assets.image.load(s, "assets/images/background.png");
    img_player     = PP.assets.image.load(s, "assets/images/player.png");

}

function create(s) {
    console.log("Executing create() - SCENE 3");

    // Definiamo l'altezza del terreno pari all'altezza del riquadro
    // di gioco, per posizionare il giocatore sul fondo della schermata.
    floor_height = PP.game.config.canvas_height;

    img_background_inst = PP.assets.image.add(s, img_background, 0, 0, 0, 0);
    player              = PP.assets.image.add(s, img_player, 200, floor_height, 0.5, 1);

}

function update(s) {
    // Facciamo ruotare il giocatore di 2° ad ogni update
    player.geometry.angle = (player.geometry.angle+2)%360;

    player.geometry.x += step_length_x;
    // Il giocatore sta uscendo dal margine destro del riquadro?
    if (player.geometry.x >= PP.game.config.canvas_width - player.geometry.display_width/2) {
        // Passo casuale (verso sinistra) di un valore a caso tra -2 e -8
        step_length_x = - (2 + Math.random()*6);
    }
    // Il giocatore sta uscendo dal margine sinistro del riquadro?
    if (player.geometry.x <= player.geometry.display_width/2){
        // Passo casuale (verso destra) di un valore a caso tra 2 e 8
        step_length_x = 2 + Math.random()*6;
    }

    // Muoviamo il giocatore lungo l'asse y
    player.geometry.y += step_length_y;
    // Il giocatore sta uscendo dal margine basso del riquadro?
    if (player.geometry.y >= PP.game.config.canvas_height - player.geometry.display_height/2) {
        // Passo casuale (verso l'alto) di un valore a caso tra -2 e -8
        step_length_y = - (2 + Math.random()*6);
    }
    // Il giocatore sta uscendo dal margine alto del riquadro?
    if (player.geometry.y <= player.geometry.display_height/2){
        // Passo casuale (verso il basso) di un valore a caso tra 2 e 8
        step_length_y = 2 + Math.random()*6;
    }


}

function destroy(s) {
    console.log("Executing destroy() - SCENE 3");

}

PP.scenes.add("scene3", preload, create, update, destroy);