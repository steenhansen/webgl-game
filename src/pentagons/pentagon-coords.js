import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";
//import { TILT_NN, TILT_SS, TILT_NW, TILT_NE, TILT_SE, TILT_SW } from "../values/constants.js";
import { RECORD_ENEMY_POINTS } from "../values/the-constants.js";
import * as THREE from "three";
//import { roundTrampoline } from "./circle-trampoline.js";
import { tileIndex2floatCoords } from "../misc/hex-maths.js";

// const PENTAGON_RISE = 0.59;
// function recordPentagon(e_record_enemy_points, e_enemy_points, f_prev_coords, f_this_coords) {
//     if (e_record_enemy_points === RECORD_ENEMY_POINTS) {
//         if (f_this_coords.x !== f_prev_coords.x || f_this_coords.y !== f_prev_coords.y || f_this_coords.z !== f_prev_coords.z) {
//             if (e_enemy_points.copy_output !== "") {
//                 let x = Math.floor(f_this_coords.x * 100) / 100;
//                 let y = f_this_coords.y / 100 + PENTAGON_RISE;
//                 let z = Math.floor(f_this_coords.z * 100) / 100;
//                 let x_y_z = `\n[${x},${y},${z}],`;
//                 e_enemy_points.copy_output += x_y_z;
//             }
//         }
//     }
// }

function startPentagons(the_enemies) {
    let o_pentagons = [];
    for (const [figure_name, enemy_data] of Object.entries(the_enemies)) {
        const x_y_z_list = enemy_data.ENEMY_X_Y_Z;
        if (x_y_z_list.length > 0) {
            o_pentagons.push([figure_name, enemy_data]);
        }
    }
    return o_pentagons;
}

function placePentagons(g_scene, object_meshes, o_pentagons) {
    let o_pentagon_meshes = new Map();
    for (var i = 0; i < o_pentagons.length; i++) {
        const pentagon_data = o_pentagons[i];
        let [figure_name, enemy_data] = pentagon_data;
        let { ENEMY_X_Y_Z, START_ENEMY_IND, INDEX_ITERATION } = enemy_data;
        const [x_str, y_str, z_str] = ENEMY_X_Y_Z[START_ENEMY_IND];
        const x_index = parseInt(x_str);
        const y_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        const two_circles = new THREE.Group();

        const pent_geometry = new THREE.CircleGeometry(0.8, 5);
        const pent_material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const pent_mesh = new THREE.Mesh(pent_geometry, pent_material);
        pent_mesh.material.side = THREE.DoubleSide;
        let [x_center, z_center] = tileIndex2floatCoords(x_index, z_index);
        pent_mesh.position.set(x_center, y_index / 100, z_center);
        pent_mesh.rotation.z = (2 * Math.PI) / 4;
        two_circles.add(pent_mesh);
        g_scene.add(two_circles);
        o_pentagon_meshes.set(figure_name, pent_mesh);
    }
    return o_pentagon_meshes;
}

function doSpin(the_objects, f_enemy_inds) {
    let o_pentagons = the_objects.o_pentagons;
    let o_pentagon_meshes = the_objects.o_pentagon_meshes;
    for (var i = 0; i < o_pentagons.length; i++) {
        let a_pentagon = o_pentagons[i];
        let [figure_name, enemy_data] = a_pentagon;
        let cur_enemy_ind = f_enemy_inds.get(figure_name);
        let { ENEMY_X_Y_Z, _START_ENEMY_IND, INDEX_ITERATION } = enemy_data;

        const [x, y, z] = ENEMY_X_Y_Z[cur_enemy_ind];
        let pentagon_mesh = o_pentagon_meshes.get(figure_name);
        pentagon_mesh.rotation.y += 0.12;
        //        pentagon_mesh.position.set(x_center, y / 100, z_center);
        //  let [x_center, z_center] = tileIndex2floatCoords(x, z);
        //        pentagon_mesh.position.set(x_center, y, z_center);
        pentagon_mesh.position.set(x, y, z);
        if (INDEX_ITERATION == 1) {
            cur_enemy_ind++;
            if (cur_enemy_ind >= ENEMY_X_Y_Z.length) {
                cur_enemy_ind = cur_enemy_ind - ENEMY_X_Y_Z.length;
            }
        } else {
            cur_enemy_ind--;
            if (cur_enemy_ind < 0) {
                cur_enemy_ind = cur_enemy_ind + ENEMY_X_Y_Z.length;
            }
        }
        f_enemy_inds.set(figure_name, cur_enemy_ind);
    }
    return f_enemy_inds;
}

function getInitIndexes(the_objects) {
    let f_enemy_inds = new Map();
    let o_pentagons = the_objects.o_pentagons;
    for (var i = 0; i < o_pentagons.length; i++) {
        let a_pentagon = o_pentagons[i];
        let [figure_name, enemy_data] = a_pentagon;
        let start_enemy_ind = enemy_data.START_ENEMY_IND;
        //  let { _ENEMY_X_Y_Z, START_ENEMY_IND, _INDEX_ITERATION } = enemy_data;
        f_enemy_inds.set(figure_name, start_enemy_ind);
    }
    return f_enemy_inds;
}

export { placePentagons, doSpin, startPentagons, getInitIndexes };
