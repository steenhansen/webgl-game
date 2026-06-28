import { ee, tt, dd, EE, TT, DD } from "../console-short.js";

import { mx_hash_vec3_1 } from "three/src/nodes/materialx/lib/mx_noise.js";
import { SQRT_3, TILT_NN, TILT_SS, TILT_NONE } from "../values/constants.js";

import { DIRECTION_NONE, DIRECTION_SS, DIRECTION_NN, DIRECTION_NW, DIRECTION_SE, DIRECTION_NE, DIRECTION_SW } from "../../values/the-constants.js";

import { hexPoints, tileTriangles, tileCenterCoord } from "./hex-tile.js";

let float_xyz = { x: 1.2345, y: 6.789, z: 0.6543 };

let row_h_col_indexes = { x_row: 1, y_10_height: 12, z_column: 4 };

// from https://www.redblobgames.com/grids/hexagons/#pixel-to-hex
//function coords2Indexes(x_coord, z_coord) {
function xzCoord2hexRowCol(x_coord, z_coord) {
    const x_row_float = (2 / 3) * x_coord;
    const z_column_float = (-1 / 3) * x_coord + (SQRT_3 / 3) * z_coord;
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
        move_direction = DIRECTION_NONE;
    } else {
        let { x_center: new_center_x, z_center: new_center_z } = tile_new;
        let { x_center: old_center_x, z_center: old_center_z } = tile_old;
        if (new_center_x == old_center_x) {
            if (new_center_z > old_center_z) {
                move_direction = DIRECTION_SS;
            } else {
                move_direction = DIRECTION_NN;
            }
        } else if (new_center_z == old_center_z) {
            if (new_center_x < old_center_x) {
                move_direction = DIRECTION_NW;
            } else {
                move_direction = DIRECTION_SE;
            }
        } else if (new_center_x > old_center_x) {
            move_direction = DIRECTION_NE;
        } else {
            move_direction = DIRECTION_SW;
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

    var old_1 = testAngledTile(0, 0, TILT_NN);

    var new_1 = testAngledTile(0, -1, TILT_NN);
    var new_x_z = tileCenterCoord(0, -1);
    var new_pos = { x: new_x_z[0], y: 10, z: new_x_z[1] };

    let m_1 = newAdjustCamY(old_1, old_pos, new_1, new_pos);
}

function newAdjustCamY(prev_tile, f_prev_coords, next_tile, f_this_coords) {
    if (prev_tile.xyz_index === next_tile.xyz_index) {
        return [next_tile, f_this_coords];
    }
    const move_direction = moveDirection(prev_tile, next_tile);

    let { tilt_up: prev_tilt_up, y_position: prev_tile_y_pos } = prev_tile;
    let { tilt_up: next_tilt_up, y_position: next_tile_y_pos } = next_tile;

    if (prev_tilt_up == next_tilt_up) {
        if (prev_tilt_up == TILT_NONE) {
        } else if (move_direction == DIRECTION_NN) {
            if (prev_tilt_up == TILT_NN) {
            } else if (prev_tilt_up == TILT_SS) {
                if (prev_tile.high_y == next_tile.low_y) {
                } else {
                }
            } else {
            }
        } else if (move_direction == DIRECTION_SS) {
        }
    } else {
        // angled to flat
        // flat to angled
        // flat to air
    }
}

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
