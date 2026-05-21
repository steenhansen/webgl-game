import { ee, tt, EE, TT } from "../console-short.js";

import { mx_hash_vec3_1 } from "three/src/nodes/materialx/lib/mx_noise.js";
import * as HEX_CONST from "../constants.js";

import { hexPoints, tileTriangles, tileCenterCoord } from "./hex-tile.js";
let g_cur_hex_indexes = { x_row: 1, y_10_height: 23, z_column: 4 };

let float_xyz = { x: 1.2345, y: 6.789, z: 0.6543 };

let row_h_col_indexes = { x_row: 1, y_10_height: 12, z_column: 4 };

// from https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
//function coords2HexIndexes(x_coord, z_coord) {
function xzCoord2hexRowCol(x_coord, z_coord) {
    const x_row_float = (2 / 3) * x_coord;
    const z_column_float = (-1 / 3) * x_coord + (HEX_CONST.SQRT_3 / 3) * z_coord;
    const row_col_hex_indexes = axialRound(x_row_float, z_column_float);
    return row_col_hex_indexes;
}

function testTile(x_index, z_index) {
    var new_tile = {
        x_center: x_index,
        z_center: z_index,
        x_z: `${x_index},${z_index}`
    };
    return new_tile;
}

function testMoveDirection() {
    var new_1 = testTile(-1, 0);
    var old_1 = testTile(0, 0);
    let m_1 = moveDirection(old_1, new_1);
}

function moveDirection(tile_old, tile_new) {
    let move_direction;

    if (tile_new.x_z === tile_old.x_z) {
        move_direction = HEX_CONST.MOVE_NO;
    } else {
        let { x_center: new_center_x, z_center: new_center_z } = tile_new;
        let { x_center: old_center_x, z_center: old_center_z } = tile_old;
        if (new_center_x == old_center_x) {
            if (new_center_z > old_center_z) {
                move_direction = HEX_CONST.MOVE_SS;
            } else {
                move_direction = HEX_CONST.MOVE_NN;
            }
        } else if (new_center_z == old_center_z) {
            if (new_center_x < old_center_x) {
                move_direction = HEX_CONST.MOVE_NW;
            } else {
                move_direction = HEX_CONST.MOVE_SE;
            }
        } else if (new_center_x > old_center_x) {
            move_direction = HEX_CONST.MOVE_NE;
        } else {
            move_direction = HEX_CONST.MOVE_SW;
        }
    }
    return move_direction;
}

function testAngledTile(x_index, z_index, tilt_up) {
    var new_tile = {
        x_center: x_index,
        z_center: z_index,
        tilt_up: tilt_up,
        x_z: `${x_index},${z_index}`
    };
    return new_tile;
}

function testNewAdjustCamY() {
    var old_x_z = tileCenterCoord(0, 0);
    var old_pos = { x: old_x_z[0], y: 10, z: old_x_z[1] };

    var old_1 = testAngledTile(0, 0, HEX_CONST.TILT_NN);

    var new_1 = testAngledTile(0, -1, HEX_CONST.TILT_NN);
    var new_x_z = tileCenterCoord(0, -1);
    var new_pos = { x: new_x_z[0], y: 10, z: new_x_z[1] };

    let m_1 = newAdjustCamY(old_1, old_pos, new_1, new_pos);
}

function newAdjustCamY(prev_tile, prev_pos, next_tile, next_pos) {
    if (prev_tile.xyz_index === next_tile.xyz_index) {
        return [next_tile, next_pos];
    }
    const move_direction = moveDirection(prev_tile, next_tile);

    let { tilt_up: prev_tilt_up, y_position: prev_tile_y_pos } = prev_tile;
    let { tilt_up: next_tilt_up, y_position: next_tile_y_pos } = next_tile;

    if (prev_tilt_up == next_tilt_up) {
        if (prev_tilt_up == HEX_CONST.TILT_NONE) {
        } else if (move_direction == HEX_CONST.MOVE_NN) {
            if (prev_tilt_up == HEX_CONST.TILT_NN) {
            } else if (prev_tilt_up == HEX_CONST.TILT_SS) {
                if (prev_tile.high_y == next_tile.low_y) {
                } else {
                }
            } else {
            }
        } else if (move_direction == HEX_CONST.MOVE_SS) {
        }
    } else {
        // angled to flat
        // flat to angled
        // flat to air
    }
}

/*
 const new_hex_indexes = adjustTTTCamY(g_cur_hex_indexes, cam_pos, g_walkway_tiles, g_walkway_flats);
 g_cur_hex_indexes = new_hex_indexes;
 const inflated_int_y = new_hex_indexes.y_10_height;
 const correct_float_y = inflated_int_y/10;
 cam_pos.y = correct_float_y + HEIGHT_ABOVE_WALKWAY;
   
*/

// from https://observablehq.com/@jrus/hexround
//  old function axial_round(x, y) {
function axialRound(x_row_float, z_column_float) {
    const x_grid = Math.round(x_row_float);
    const z_grid = Math.round(z_column_float);
    x_row_float -= x_grid;
    z_column_float -= z_grid;
    const x_squared = x_row_float * x_row_float;
    const z_squared = z_column_float * z_column_float;
    const d_x = Math.round(x_row_float + 0.5 * z_column_float) * (x_squared >= z_squared);
    const d_z = Math.round(z_column_float + 0.5 * x_row_float) * (x_squared < z_squared);
    const x_row = x_grid + d_x;
    const z_column = z_grid + d_z;
    const row_col_hex_indexes = [x_row, z_column];
    return row_col_hex_indexes;
}

export { newAdjustCamY, testNewAdjustCamY, testMoveDirection, moveDirection, xzCoord2hexRowCol };
