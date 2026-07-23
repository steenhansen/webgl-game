import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import { MV_FENCE_BLOCKED, TILT_NONE } from "../values/the-constants.js";
import { undefTileDebugInfo } from "./ground-tiles.js";
import { HEX_PAIR_DIVIDER } from "../values/the-constants.js";
import { tileIndex2floatCoords, floatCoords2tileIndex } from "./hex-tile.js";

function hitFence(o_fence_walls, prev_hex, this_hex) {
    const xyz_1_2_index = `${prev_hex}${HEX_PAIR_DIVIDER}${this_hex}`;
    let cur_xz_fence_column = o_fence_walls.get(xyz_1_2_index);
    if (cur_xz_fence_column) {
        return true;
    }
    return false;
}

function currentHexIdxs(hex_data) {
    let { f_prev_coords, f_this_coords, f_y100_height, f_move_result, f_cam_vect } = hex_data;

    if (f_move_result == MV_FENCE_BLOCKED) {
        let [ndx_x, ndx_z] = floatCoords2tileIndex(f_prev_coords.x, f_prev_coords.z);
        let [x_coord, z_coord] = tileIndex2floatCoords(ndx_x, ndx_z);
        f_prev_coords.x = x_coord;
        f_prev_coords.z = z_coord;
        f_cam_vect.x = f_prev_coords.x;
        f_cam_vect.y = f_prev_coords.y / 100;
        f_cam_vect.z = f_prev_coords.z;
        f_this_coords = f_prev_coords;
    } else {
        f_prev_coords = f_this_coords;
        f_this_coords.y = f_y100_height;
    }

    return [f_prev_coords, f_this_coords, f_y100_height];
}

function hexIndex(x_hex_ind, y_height, z_hex_ind) {
    let y_fixed_to_10ths = Math.trunc(y_height * 10) / 10;

    let hex_index = `${x_hex_ind},${y_fixed_to_10ths},${z_hex_ind}`;
    return hex_index;
}

function stripYindex(hex_index) {
    let [x_hex_ind, _y_height, z_hex_ind] = hex_index.split(",");
    return `${x_hex_ind},${z_hex_ind}`;
}

function offWalkway(walkway_columns, this_hex) {
    let current_xz_index = stripYindex(this_hex);
    let current_xz_column = walkway_columns.get(current_xz_index);
    if (current_xz_column == undefined) {
        return true; // falling in a column with no tiles
    }
    let current_xyz_walkway_index = current_xz_column.get(this_hex);
    if (current_xyz_walkway_index == undefined) {
        return true; // falling in a column with tiles, but no tile at this height
    }

    return false;
}

function tileData(o_walkway_tiles, prev_hex, this_hex) {
    let current_walkway_tile = o_walkway_tiles.get(this_hex);
    const { tilt_up: new_tilt_up, low_y: new_low_y, high_y: new_high_y } = current_walkway_tile;
    let prev_tilt_up, prev_low_y, prev_high_y;
    let prev_walkway_tile = o_walkway_tiles.get(prev_hex);
    if (prev_walkway_tile) {
        prev_tilt_up = prev_walkway_tile.tilt_up;
        prev_low_y = prev_walkway_tile.low_y;
        prev_high_y = prev_walkway_tile.high_y;
    } else {
        prev_tilt_up = new_tilt_up;
        prev_low_y = new_low_y;
        prev_high_y = new_high_y;
    }
    const low_to_low = prev_low_y == new_low_y;
    const high_to_high = prev_high_y == new_high_y;
    const lows_and_highs = low_to_low && high_to_high;
    const high_to_low = prev_high_y == new_low_y;
    const low_to_high = prev_low_y == new_high_y;
    const prev_new_data = { prev_tilt_up, prev_low_y, prev_high_y, new_tilt_up, new_low_y, new_high_y };
    const tile_data = { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high };

    return { prev_new_data, tile_data };
}

export { hexIndex, stripYindex, tileData, hitFence, offWalkway, currentHexIdxs };
