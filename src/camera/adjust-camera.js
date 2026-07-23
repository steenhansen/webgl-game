import { ee, tt, dd, EE, TT, DD } from "../misc/console-short.js";

import {
    MV_FENCE_BLOCKED,
    MV_FALL_STEP_OFF,
    MV_TILE_SAME,
    DIRECTION_NONE,
    DIRECTION_SS,
    DIRECTION_NN,
    DIRECTION_NW,
    DIRECTION_SE,
    DIRECTION_NE,
    DIRECTION_SW
} from "../values/the-constants.js";

import { floatCoords2tileIndex } from "../tiles/hex-tile.js";
import { hexIndex } from "../tiles/hex-routines.js";

import { nearTestNN } from "./camera-nn.js";
import { nearTestNE } from "./camera-ne.js";
import { nearTestNW } from "./camera-nw.js";
import { nearTestSS } from "./camera-ss.js";
import { nearTestSW } from "./camera-sw.js";
import { nearTestSE } from "./camera-se.js";

function transition2NewTile(the_objects, f_prev_coords, f_this_coords) {
    let ndx_y100 = f_this_coords.y;
    let y_index = ndx_y100 / 100;
    let y_frac = y_index % 1;

    let on_meetins_hinge_height = y_frac == 5 || y_frac == 0;
    if (!on_meetins_hinge_height) {
        const c_move_result = MV_FALL_STEP_OFF;
        return c_move_result;
    }

    let [prev_x_ind, prev_z_ind] = floatCoords2tileIndex(f_prev_coords.x, f_prev_coords.z);
    let [ndx_x, ndx_z] = floatCoords2tileIndex(f_this_coords.x, f_this_coords.z);
    let move_dir = movingDirection(f_prev_coords.x, f_prev_coords.z, f_this_coords.x, f_this_coords.z);
    let move_result;
    if (move_dir == DIRECTION_NN) {
        move_result = nearTestNN(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, f_prev_coords.y, prev_z_ind);
    } else if (move_dir == DIRECTION_NE) {
        move_result = nearTestNE(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, f_prev_coords.y, prev_z_ind);
    } else if (move_dir == DIRECTION_SS) {
        move_result = nearTestSS(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, f_prev_coords.y, prev_z_ind);
    } else if (move_dir == DIRECTION_SW) {
        move_result = nearTestSW(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, f_prev_coords.y, prev_z_ind);
    } else if (move_dir == DIRECTION_NW) {
        move_result = nearTestNW(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, f_prev_coords.y, prev_z_ind);
    } else if (move_dir == DIRECTION_SE) {
        move_result = nearTestSE(the_objects, ndx_x, ndx_y100, ndx_z, prev_x_ind, f_prev_coords.y, prev_z_ind);
    } else {
        move_result = MV_TILE_SAME;
    }
    return move_result;
}

/*
 https://www.quora.com/How-would-you-find-the-angle-of-a-line-given-two-points-on-a-coordinate-plan
*/

const NE_START_0D = 0;
const NE_END_60D = Math.PI / 3;

const NN_START_60D = Math.PI / 3;
const NN_END_120D = (2 * Math.PI) / 3;

const NW_START_120D = (2 * Math.PI) / 3;
const NW_END_180D = (3 * Math.PI) / 3;

const SW_START_180D = (-2 * Math.PI) / 3;
const SW_END_240D = (-3 * Math.PI) / 3;

const SS_START_240D = (-1 * Math.PI) / 3;
const SS_END_300D = (-2 * Math.PI) / 3;

const SE_START_300D = (0 * Math.PI) / 3;
const SE_END_0D = (-1 * Math.PI) / 3;

function movingDirection(prev_x_coord, prev_z_coord, new_x_coord, new_z_coord) {
    const dx = new_x_coord - prev_x_coord;
    const dz = prev_z_coord - new_z_coord;
    const theta = Math.atan2(dz, dx);
    let move_direction;
    if (new_x_coord == prev_x_coord && new_z_coord == prev_z_coord) {
        move_direction = DIRECTION_NONE;
    } else {
        if (theta >= NE_START_0D && theta < NE_END_60D) {
            //    ee("*** NE");
            move_direction = DIRECTION_NE;
        } else if (theta >= NN_START_60D && theta < NN_END_120D) {
            //  ee("*** NN");
            move_direction = DIRECTION_NN;
        } else if (theta >= NW_START_120D && theta <= NW_END_180D) {
            //   ee("*** NW");
            move_direction = DIRECTION_NW;
        } else if (theta <= SW_START_180D && theta >= SW_END_240D) {
            //   ee("*** SW");
            move_direction = DIRECTION_SW;
        } else if (theta <= SS_START_240D && theta > SS_END_300D) {
            //   ee("*** SS");
            move_direction = DIRECTION_SS;
        } else if (theta <= SE_START_300D && theta > SE_END_0D) {
            //    ee("*** SE");
            move_direction = DIRECTION_SE;
        } else {
            ee("*** NOT SURE  THETA--=", theta);
            move_direction = DIRECTION_NONE;
        }
    }
    return move_direction;
}

function isVerticallyNear2(the_objects, this_hex) {
    const o_walkway_tiles = the_objects.o_walkway_tiles;
    if (o_walkway_tiles.has(this_hex)) {
        return true;
    }
    return false;
}

export { transition2NewTile, isVerticallyNear2 };
