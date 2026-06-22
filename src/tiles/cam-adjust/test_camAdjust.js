import { ee, tt, EE, TT } from "../../console-short.js";

import { AScene } from "../../a-scene.js";
import { C____GREEN, C_____BLUE, C___YELLOW, TILT_NE, TILT_NONE, TILT_NN, TILT_SW } from "../../values/constants.js";
import { makeWalkway } from "../walkway-coords.js";
import { tileTransition } from "./camAdjust.js";

import { tileCenterCoord } from "../hex-tile.js";

import { TEST_TILE_MOVE, TEST_TILE_MOVE } from "../values/constants.js";

function make_camPos(x_hex_index, y_height, z_hex_index) {
    let [x_center_coord, z_center_coord] = tileCenterCoord(x_hex_index, z_hex_index);
    let a_f_cam_vect = { x: x_center_coord, y: y_height, z: z_center_coord };
    return a_f_cam_vect;
}

function checkPrevNextTiles(prev_tile, new_tile) {
    const g_scene = AScene(0x202025);
    const [xa, ya, za] = prev_tile.tile;
    const [xb, yb, zb] = new_tile.tile;

    let walkway_0, walkway_1;
    if (prev_tile.length == 3) {
        walkway_0 = [xa, ya, za];
    } else {
        walkway_0 = [xa, ya, za, C____GREEN, prev_tile.tilt, prev_tile.incline];
    }
    if (new_tile.length == 3) {
        walkway_1 = [xb, yb, zb];
    } else {
        walkway_1 = [xb, yb, zb, C_____BLUE, new_tile.tilt, new_tile.incline];
    }
    const o_walkway_ndxs = [walkway_0, walkway_1];
    let walkway_meshes = new Map();
    let walkway_tiles = new Map();
    var walkway_columns = new Map([]);
    var walkway_overlaps = new Map([]);

    [walkway_meshes, walkway_tiles, walkway_columns, walkway_overlaps] = makeWalkway(
        g_scene,
        o_walkway_ndxs,
        walkway_meshes,
        walkway_tiles,
        walkway_columns,
        walkway_overlaps
    );

    let cam_prev = make_camPos(xa, ya, za);
    let cam_new = make_camPos(xb, yb, zb);
    let change_allowed = tileTransition(TEST_TILE_MOVE, TESTINs_PRINT, o_walkway_ndxs, walkway_tiles, walkway_columns, cam_prev, cam_new);
    return change_allowed;
}

function test_tileTransition(test_map) {
    test_map.set("ne_a_TILT_SW_same_TILT_NONE_same", checkPrevNextTiles(prev_tile, new_tile));
    test_map.set("ne_b_TILT_SW_low_TILT_NONE_high", checkPrevNextTiles(prev_tile, new_tile));
    test_map.set("ne_c_TILT_SW_high_TILT_NONE_low", checkPrevNextTiles(prev_tile, new_tile));
    //

    // {
    //     var prev_tile = { tile: [0, 1, 0] };
    //     var new_tile = { tile: [1, 1, -1] };
    //     test_map.set("ne_a_flat_2_flat_same_h", checkPrevNextTiles(prev_tile, new_tile));
    // }
    // ///////////////////////
    // {
    //     var prev_tile = { tile: [0, 2, 0] };
    //     var new_tile = { tile: [1, 1, -1] };
    //     test_map.set("ne_b_flat_2_flat_down_h", !checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 1, 0] };
    //     var new_tile = { tile: [1, 2, -1] };
    //     test_map.set("ne_c_flat_2_flat_up_h", !checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 1, 0] };
    //     var new_tile = { tile: [1, 1, -1], tilt: TILT_NE, incline: 1 };
    //     test_map.set("ne_d_flat_2_angled_touch_up", checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 1, 0] };
    //     var new_tile = { tile: [1, 2, -1], tilt: TILT_NE, incline: 1 };
    //     test_map.set("ne_e_flat_2_angled_gap_up", !checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 2, 0] };
    //     var new_tile = { tile: [1, 1, -1], tilt: TILT_SW, incline: 1 };
    //     test_map.set("ne_f_flat_2_angled_touch_down", checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 3, 0] };
    //     var new_tile = { tile: [1, 1, -1], tilt: TILT_SW, incline: 1 };
    //     test_map.set("ne_s_flat_2_angled_gap_down", checkPrevNextTiles(prev_tile, new_tile));
    // }
    // //////////////////////////////
    // {
    //     var prev_tile = { tile: [0, 1, 0], tilt: TILT_NE, incline: 1 };
    //     var new_tile = { tile: [1, 2, -1] };
    //     test_map.set("ne_h_angled_2_flat_touch_up", checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 1, 0], tilt: TILT_NE, incline: 1 };
    //     var new_tile = { tile: [1, 3, -1] };
    //     test_map.set("ne_i_angled_2_flat_gap_up", !checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 2, 0], tilt: TILT_SW, incline: 1 };
    //     var new_tile = { tile: [1, 2, -1] };
    //     test_map.set("ne_j_angled_2_flat_touch_down", checkPrevNextTiles(prev_tile, new_tile));
    // }

    // {
    //     var prev_tile = { tile: [0, 3, 0], tilt: TILT_SW, incline: 1 };
    //     var new_tile = { tile: [1, 2.5, -1] };
    //     test_map.set("ne_k_angled_2_flat_gap_down", checkPrevNextTiles(prev_tile, new_tile));
    // }

    /////////////////////////

    {
        var prev_tile = { tile: [0, 1, 0], tilt: TILT_NE, incline: 1 };
        var new_tile = { tile: [1, 2, -1], tilt: TILT_NE, incline: 1 };
        test_map.set("ne_l_angled_2_angled_touch_up", checkPrevNextTiles(prev_tile, new_tile));
    }

    return test_map;
}

export { test_tileTransition };
