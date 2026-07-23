//  http://localhost:5173/index-dev.html?trace-route=figure-nn-pier

import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../values/constants.js";
import { GET_ABOVE_TILES, RECORD_ENEMY_POINTS } from "../values/the-constants.js";
import * as THREE from "three";
//import { roundTrampoline } from "./circle-trampoline.js";
import { tileIndex2floatCoords } from "../misc/hex-maths.js";

const PENTAGON_RISE = 59;

//  FIX f_cam_vect==f_this_coords  except for .y
function recordEnemy(e_record_enemy_points, e_enemy_points, f_cam_vect, f_prev_coords, f_this_coords) {
    // tt("recordEnemy  f_this_coords,", f_this_coords);
    if (e_record_enemy_points === RECORD_ENEMY_POINTS) {
        if (f_this_coords.x !== f_prev_coords.x || f_this_coords.y !== f_prev_coords.y || f_this_coords.z !== f_prev_coords.z) {
            if (e_enemy_points.copy_output !== "") {
                let real_x = f_cam_vect.x;
                let real_y = f_cam_vect.y; // - 0.5; //GET_ABOVE_TILES;
                let real_z = f_cam_vect.z;

                // let x = Math.floor(f_this_coords.x * 100) / 100;
                // let y = f_this_coords.y + PENTAGON_RISE;
                // let z = Math.floor(f_this_coords.z * 100) / 100;
                //                let x_y_z = `\n[${x},${y},${z}],`;
                //                let x_y_z = `\n[${x},${real_y},${z}],`;
                let x_y_z = `\n[${real_x},${real_y},${real_z}], // ${f_this_coords.x},${f_this_coords.y},${f_this_coords.z} `;
                e_enemy_points.copy_output += x_y_z;
            }
        }
    }
}

export { recordEnemy };
