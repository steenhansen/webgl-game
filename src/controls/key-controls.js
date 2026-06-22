import { ee, tt, EE, TT } from "../misc/console-short.js";

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { X_Z_2D_INCREMENT } from "../values/move-consts.js";

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const consLog = window["con" + "sole"].log;

function makeControls(g_camera, e_enemy_points, e_do_click) {
    const g_key_controls = new PointerLockControls(g_camera, document.body);

    // g_key_controls.minPolarAngle = Math.PI / 2; // Limit upward rotation
    // g_key_controls.maxPolarAngle = Math.PI / 2; // Limit downward rotation (e.g., no looking behind)

    const onKeyDown = function (event) {
        switch (event.code) {
            case "KeyO":
                e_enemy_points.copy_output = " const PENTAGON_POINTS_X = [";
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog("** START PENTAGON RECORDING **");
                break;

            case "KeyP":
                const enemy_moves = e_enemy_points.copy_output + "];";
                consLog("** STOP PENTAGON RECORDING ***");
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog("******************************");
                consLog(enemy_moves);
                break;

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
        if (event.button === 0) {
            g_key_controls.lock();
            e_do_click.was_clicked = true;
        } else if (event.button === 2) {
            event.preventDefault();
            g_key_controls.unlock();
        }
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return g_key_controls;
}

function moveKeys(delta, g_key_controls) {
    // const delta = clock.getDelta();
    const speed = X_Z_2D_INCREMENT * delta;
    //const speed = 2 * delta;

    if (moveForward) g_key_controls.moveForward(speed);
    if (moveBackward) g_key_controls.moveForward(-speed);

    if (moveLeft) g_key_controls.moveRight(-speed);
    if (moveRight) g_key_controls.moveRight(speed);
}

export { moveKeys, makeControls };
