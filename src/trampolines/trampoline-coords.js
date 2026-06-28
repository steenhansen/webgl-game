import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import {
    MV_START_TRAMPOLINE,
    MV_TILE_SAME,
    MV_FALL_TRAMPOLINE,
    MV_RISE_TRAMPOLINE,
    MV_FALL_JUMP_STRAIGHT,
    MV_RISE_JUMP_STRAIGHT,
    MV_FALL_STEP_OFF,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_SE90,
    TILT_NN90,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE
} from "../values/the-constants.js";
import * as THREE from "three";

import { hexPoints } from "../tiles/hex-tile.js";

import { trampolineMesh } from "./trampoline-mesh.js";
import { addTextLoc } from "../tiles/text-tiles.js";
import { distance2hexpoints, tileCenterCoord } from "../misc/hex-maths.js";
function trampolineTriangles(hex_points) {
    const [top_left, top_right, right_tip, bot_right, bot_left, left_tip, middle_point] = hex_points;

    const t1 = [...middle_point, ...top_left, ...top_right];
    const t2 = [...middle_point, ...bot_right, ...bot_left];
    const t3 = [...middle_point, ...right_tip, ...bot_right];
    const t4 = [...middle_point, ...top_right, ...right_tip];
    const t5 = [...middle_point, ...bot_left, ...left_tip];
    const t6 = [...middle_point, ...left_tip, ...top_left];

    let hexagon_triangles = [t1, t2, t3, t4, t5, t6];

    return hexagon_triangles;
}
function makeTrampolines(g_scene, o_trampolines) {
    var trampoline_columns = new Map();
    let o_trampoline_meshes = new Map();
    for (var i = 0; i < o_trampolines.length; i++) {
        const trampoline_data = o_trampolines[i];

        // ["0", HEIGHT_Y____9, "1", BOUNCE_SPEED___4, BOUNCE_COUNT___25, TILT_SW, INCLINE___1]
        let [x_str, y_str, z_str, f_bounce_speed, f_step_iterations, slope_tilt, incline_amount] = trampoline_data;

        f_step_iterations = parseInt(f_step_iterations);

        const x_index = parseInt(x_str);
        const y_100_index = parseInt(y_str);
        const z_index = parseInt(z_str);

        const x_y_z = [x_index, y_100_index, z_index];

        const xyz_index = `${x_index},${y_100_index},${z_index}`;

        if (slope_tilt == undefined) {
            slope_tilt = TILT_NONE;
            incline_amount = 0;
        }
        if (incline_amount == undefined) {
            incline_amount[(TILT_NONE, 0)];
        }

        let [x_center, z_center] = tileCenterCoord(x_index, z_index);
        const tile_radius = 1;

        const a_tile = new THREE.Group();
        a_tile.position.set(x_center, 0, z_center);
        const tile_points = hexPoints(tile_radius, y_100_index, slope_tilt, incline_amount);

        let d_tile_3colors = { dark_color: "red", light_color: "green", edge_color: "blue" };

        trampoline_columns = trampolineObj(
            trampoline_columns,
            x_y_z,
            f_bounce_speed,
            f_step_iterations,
            slope_tilt,
            incline_amount,
            tile_points,
            d_tile_3colors
        );
        const top_triangles = trampolineTriangles(tile_points);
        trampolineMesh(a_tile, top_triangles, f_bounce_speed);

        g_scene.add(a_tile);
        addTextLoc(a_tile, x_y_z, slope_tilt, incline_amount);
        o_trampoline_meshes.set(xyz_index, a_tile);
    }
    return [o_trampoline_meshes, trampoline_columns];
}

function trampolineObj(stair_tiles, x_y_z, f_bounce_speed, f_step_iterations, slope_tilt, incline_amount, tile_points, d_tile_3colors) {
    let { light_color, dark_color, _edge_color } = d_tile_3colors;
    const [x_index, y_index, z_index] = x_y_z;
    const xyz_index = `${x_index},${y_index},${z_index}`;
    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    let tile_positions = [];

    for (let i = 0; i < tile_points.length; i++) {
        let tile_point = tile_points[i];
        if (Array.isArray(tile_point)) {
            let [x, y, z] = tile_point;
            x = x + x_center;
            z = z + z_center;
            tile_positions.push([x, y, z]);
        }
    }

    let accross_length = 0;
    let top_point, bottom_point;
    if (slope_tilt == TILT_NW) {
        bottom_point = tile_positions[1];
        top_point = tile_positions[5];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_NE) {
        bottom_point = tile_positions[0];
        top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_SW) {
        bottom_point = tile_positions[2];
        top_point = tile_positions[0];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_SE) {
        bottom_point = tile_positions[5];
        top_point = tile_positions[2];
        accross_length = distance2hexpoints(bottom_point, top_point);
    } else if (slope_tilt == TILT_NN) {
        bottom_point = tile_positions[0];
        top_point = tile_positions[3];
    } else if (slope_tilt == TILT_SS) {
        bottom_point = tile_positions[3];
        top_point = tile_positions[0];
    } else {
        bottom_point = tile_positions[0];
        top_point = bottom_point;
    }

    let top_point_y = top_point[1];
    let bottom_point_y = bottom_point[1];

    if (top_point_y === bottom_point_y) {
        top_point_y = top_point_y; // * 10;
        bottom_point_y = top_point_y;
    } else {
        top_point_y = top_point_y; // * 10; // - 0.0001;
        bottom_point_y = bottom_point_y; // * 10; // + 0.0001;
    }

    var tile_obj = {
        x_center: x_center,
        y_position: y_index, //
        z_center: z_center,
        tilt_up: slope_tilt,
        angle_incline: incline_amount,
        accross_length: accross_length,
        tile_positions: tile_positions,
        x_z: `${x_index},${z_index}`, // a_c !!!
        xyz_index: xyz_index,
        f_bounce_speed: f_bounce_speed,
        f_step_iterations: f_step_iterations,
        light_color: light_color,
        dark_color: dark_color,
        high_y: top_point_y, // high_y,
        low_y: bottom_point_y // low_y
    };
    stair_tiles.set(xyz_index, tile_obj);
    return stair_tiles;
}

export { makeTrampolines };
