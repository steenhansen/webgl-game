import { ee, tt, EE, TT } from "../misc/console-short.js";
import * as THREE from "three";
import {
    MV_START_TRAMPOLINE,
    MV_FALL_STEP_OFF,
    MV_RISE_TRAMPOLINE,
    MV_FALL_TRAMPOLINE,
    MV_FALL_JUMP_STRAIGHT,
    MV_TILE_NEW,
    MV_TILE_SAME,
    MV_FENCE_BLOCKED,
    X_INDX,
    Y_INDX,
    Z_INDX,
    TILT_NN,
    TILT_SS,
    TILT_NW,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NONE
} from "../values/the-constants.js";
import { hexPoints, tileTriangles, tileCenterCoord } from "./hex-tile.js";
import { addCoords } from "./mesh-tiles.js";
import { tileMesh } from "./tile-mesh.js";
import { seaColor } from "../misc/tile-colors.js";

function undefTileDebugInfo(prev_tilt_up) {
    const prev_new_data = {
        prev_tilt_up: prev_tilt_up,
        prev_low_y: undefined,
        prev_high_y: undefined,
        new_tilt_up: undefined,
        new_low_y: undefined,
        new_high_y: undefined,
        new_low_y: undefined,
        new_high_y: undefined
    };
    const data = { low_to_low: undefined, high_to_high: undefined, lows_and_highs: undefined, high_to_low: undefined, low_to_high: undefined };
    return { prev_new_data, data };
}

function moveAllow(local_data, mess_1) {
    if (window.HEX_VARS.PRINT_ALLOWED == "PRINT_ALLOWED") {
        let { prev_tilt_up, new_tilt_up, prev_hex, this_hex } = local_data;
        ee(`${mess_1} Allowed :: ${prev_hex},${prev_tilt_up} :: ${this_hex},${new_tilt_up}`);
    }
    if (local_data.prev_hex == local_data.this_hex) {
        return MV_TILE_SAME;
    }
    return MV_TILE_NEW;
}

function moveBlock(local_data, mess_1) {
    if (window.HEX_VARS.PRINT_ALLOWED == "PRINT_ALLOWED") {
        let { prev_tilt_up, new_tilt_up, prev_hex, this_hex } = local_data;
        ee(`${mess_1} Blocked :: ${prev_hex},${prev_tilt_up} :: ${this_hex},${new_tilt_up}`);
    }
    return MV_FENCE_BLOCKED;
}

function moveDescendOneStep(local_data, mess_1) {
    if (window.HEX_VARS.PRINT_ALLOWED == "PRINT_ALLOWED") {
        let { prev_tilt_up, new_tilt_up, prev_hex, this_hex } = local_data;
        ee(`${mess_1} DescendOneStep :: ${prev_hex},${prev_tilt_up} :: ${this_hex},${new_tilt_up}`);
    }
    let c_move_result = MV_FALL_STEP_OFF;
    return c_move_result;
}
function moveOntoTrampoline(local_data, mess_1) {
    if (window.HEX_VARS.PRINT_ALLOWED == "PRINT_ALLOWED") {
        let { prev_tilt_up, new_tilt_up, prev_hex, this_hex } = local_data;
        ee(`${mess_1} Trampoline :: ${prev_hex},${prev_tilt_up} :: ${this_hex},${new_tilt_up}`);
    }
    let c_move_result = MV_START_TRAMPOLINE;
    return c_move_result;
}

function moveIntoAir(local_data, mess_1) {
    if (window.HEX_VARS.PRINT_ALLOWED == "PRINT_ALLOWED") {
        let { prev_tilt_up, new_tilt_up, prev_hex, this_hex } = local_data;
        ee(`${mess_1} Airborne :: ${prev_hex},${prev_tilt_up} :: ${this_hex},${new_tilt_up}`);
    }
    let c_move_result = MV_FALL_STEP_OFF;
    return c_move_result;
}

////////////////////
function ground_field(g_scene, hex_tiles, ground_tiles, start_x, end_x, sea_colors, sea_edge) {
    for (let x = start_x; x < end_x; x++) {
        [hex_tiles, ground_tiles] = groundRow(hex_tiles, ground_tiles, g_scene, x, -10, 10, sea_colors, sea_edge);
    }
    return [hex_tiles, ground_tiles];
}

function groundRow(hex_tiles, ground_tiles, g_scene, x_row, start_z, end_z, sea_colors, sea_edge) {
    for (let z = start_z; z < end_z; z++) {
        const ground_indexes = [x_row, -100, z];
        hex_tiles = groundTile(hex_tiles, g_scene, ground_indexes, sea_colors, sea_edge);
    }
    return [hex_tiles, ground_tiles];
}

function groundTile(hex_tiles, g_scene, x_y_z, sea_colors, sea_edge) {
    const [x_index, y_height, z_index] = x_y_z;
    let sea_color = seaColor(x_y_z, sea_colors);

    let [x_center, z_center] = tileCenterCoord(x_index, z_index);
    const tile_radius = 1;
    const a_tile = new THREE.Group();
    a_tile.position.set(x_center, 0, z_center);
    const stair_tiles = hexPoints(tile_radius, y_height, TILT_NONE, 0);
    const top_triangles = tileTriangles(stair_tiles);

    tileMesh(a_tile, top_triangles, sea_color, sea_edge);

    g_scene.add(a_tile);
    addCoords(a_tile, x_y_z, TILT_NONE, 0);
    const xyz_index = `${x_index},${y_height},${z_index}`;
    hex_tiles.set(xyz_index, a_tile);
    return hex_tiles;
}

export { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, undefTileDebugInfo, groundRow, ground_field, groundTile, moveAllow, moveBlock };
