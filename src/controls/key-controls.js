import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { urlMapTrace } from "../misc/minor-routines.js";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { X_Z_2D_INCREMENT } from "../values/move-consts.js";

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

const consLog = window["con" + "sole"].log;
const consClear = window["con" + "sole"].clear;

let g_enemy_points = { copy_output: "" };

function makeControls(g_camera, g_recording_figure, e_do_click) {
    let _my_map, my_figure;
    const g_key_controls = new PointerLockControls(g_camera, document.body);

    // g_key_controls.minPolarAngle = Math.PI / 2; // Limit upward rotation
    // g_key_controls.maxPolarAngle = Math.PI / 2; // Limit downward rotation (e.g., no looking behind)

    const onKeyDown = function (event) {
        switch (event.code) {
            case "KeyO":
                [_my_map, my_figure] = urlMapTrace(window.location.search);
                if (my_figure) {
                    consClear();
                    const dash_2_under = g_recording_figure.replace(/-/g, "_");
                    const upper_case = dash_2_under.toUpperCase();
                    const figure_2_enemy = upper_case.replace("FIGURE_", "ENEMY_");
                    g_enemy_points.copy_output += ` \n\n const ${figure_2_enemy} = [ `;
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog(`** START ENEMY RECORDING FOR ** ${my_figure}`);
                    break;
                }

            case "KeyP":
                [_my_map, my_figure] = urlMapTrace(window.location.search);
                if (my_figure) {
                    const enemy_moves = g_enemy_points.copy_output + "\n];";
                    consLog(`** STOP ENEMY RECORDING FOR ** ${my_figure}`);
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog("******************************");
                    consLog(enemy_moves);
                    break;
                }
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
        }
    });

    function handleContext(event) {
        event.preventDefault();
    }

    document.addEventListener("contextmenu", handleContext);

    document.body.addEventListener("pointerdown", () => {
        if (event.button === 2) {
            g_key_controls.unlock();
            removeEventListener("contextmenu", handleContext);
        }
    });

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return [g_key_controls, g_enemy_points];
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
