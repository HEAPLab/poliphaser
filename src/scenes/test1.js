let stepLength = 3;
let floorHeight = 600;

function preload() {
    console.log("Executing preload()");
}


function create() {
    console.log("Executing create()");
}

function update() {
    console.log("Executing update()");
}

function destroy() {
    console.log("Executing destroy()");
}

PP.scenes.add("test1", preload, create, update, destroy);
