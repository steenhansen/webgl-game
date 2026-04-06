import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

//var controls;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
function makeControls(persp_camera) {
    const controls = new PointerLockControls(persp_camera, document.body);

    // controls.minPolarAngle = Math.PI / 2; // Limit upward rotation
    // controls.maxPolarAngle = Math.PI / 2; // Limit downward rotation (e.g., no looking behind)

    const onKeyDown = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = true;
                break;
            case "ArrowLeft":
            case "KeyA":
                moveLeft = true;
                break;
            case "ArrowDown":
            case "KeyS":
                moveBackward = true;
                break;
            case "ArrowRight":
            case "KeyD":
                moveRight = true;
                break;
        }
    };

    const onKeyUp = function (event) {
        //console.log("keypup", event.code);
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = false;
                break;
            case "ArrowLeft":
            case "KeyA":
                moveLeft = false;
                break;
            case "ArrowDown":
            case "KeyS":
                moveBackward = false;
                break;
            case "ArrowRight":
            case "KeyD":
                moveRight = false;
                break;
        }
    };

    document.body.addEventListener("click", () => {
        controls.lock();
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return controls;
}

function moveKeys(delta, controls) {
    //console.log("movekeys", moveForward);
    // const delta = clock.getDelta();
    //    const speed = 10 * delta;
    const speed = 2 * delta;
    if (moveForward) controls.moveForward(speed);
    if (moveBackward) controls.moveForward(-speed);

    if (moveLeft) controls.moveRight(-speed);
    if (moveRight) controls.moveRight(speed);
}

export { moveKeys, makeControls };
