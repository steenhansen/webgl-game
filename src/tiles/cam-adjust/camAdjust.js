import { ee, tt, EE, TT } from "../../misc/console-short.js";

import {
    MV_FALL_STEP_OFF,
    MV_TILE_SAME,
    DIRECTION_NONE,
    DIRECTION_SS,
    DIRECTION_NN,
    DIRECTION_NW,
    DIRECTION_SE,
    DIRECTION_NE,
    DIRECTION_SW
} from "../../values/the-constants.js";
//import { DIRECTION_NN, DIRECTION_SS, DIRECTION_NW, DIRECTION_NE, DIRECTION_SE, DIRECTION_SW, DIRECTION_NONE } from "../../values/the-constants.js";

import { tileCenterCoord, coords2Indexes } from "../hex-tile.js";
import { hexIndex, stripYindex } from "../hex-routines.js";

import { moveToNn } from "../nn/nn-move.js";
import { moveToNe } from "../ne/ne-move.js";
import { moveToNw } from "../nw/nw-move.js";
import { moveToSs } from "../ss/ss-move.js";

import { moveToSw } from "../sw/sw-move.js";

import { moveToSe } from "../se/se-move.js";

function verticallyNearNN(the_objects, x_ind, ndx_y100, z_ind, prev_hex, is_a_trampoline) {
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    const c_move_result = moveToNn(the_objects, prev_hex, tile_index, is_a_trampoline);
    return c_move_result;
}

function nearTestNN(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 100, ndx_z)) {
        return verticallyNearNN(the_objects, ndx_x, ndx_y100 + 100, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 50, ndx_z)) {
        return verticallyNearNN(the_objects, ndx_x, ndx_y100 + 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 50, ndx_z)) {
        return verticallyNearNN(the_objects, ndx_x, ndx_y100 - 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 100, ndx_z)) {
        return verticallyNearNN(the_objects, ndx_x, ndx_y100 - 100, ndx_z, prev_hex, is_a_trampoline);
    }
    return verticallyNearNN(the_objects, ndx_x, ndx_y100 + 0, ndx_z, prev_hex, is_a_trampoline);
}

function transition2NewTile(the_objects, f_prev_coords, f_this_coords, is_a_trampoline) {
    let ndx_y100 = f_this_coords.y;
    let y_index = ndx_y100 / 100;
    let y_frac = y_index % 1;

    let on_meetins_hinge_height = y_frac == 5 || y_frac == 0;
    if (!on_meetins_hinge_height) {
        const c_move_result = MV_FALL_STEP_OFF;
        return c_move_result;
    }

    let [prev_x_ind, prev_z_ind] = coords2Indexes(f_prev_coords.x, f_prev_coords.z);
    let [ndx_x, ndx_z] = coords2Indexes(f_this_coords.x, f_this_coords.z);
    let move_dir = moveDirectionCoords2(f_prev_coords.x, f_prev_coords.z, f_this_coords.x, f_this_coords.z);
    let prev_hex = hexIndex(prev_x_ind, f_prev_coords.y, prev_z_ind);
    let no_old_new_tile;
    if (move_dir == DIRECTION_NN) {
        return nearTestNN(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline);
    } else if (move_dir == DIRECTION_NE) {
        const is_hit_ne = nearTestNE(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline);
        return is_hit_ne;
    } else if (move_dir == DIRECTION_SS) {
        return nearTestSS(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline);
    } else if (move_dir == DIRECTION_SW) {
        const is_hit_sw = nearTestSW(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline);
        return is_hit_sw;
    } else if (move_dir == DIRECTION_NW) {
        return nearTestNW(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline);
    } else if (move_dir == DIRECTION_SE) {
        return nearTestSE(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline);
    } else {
        if (is_a_trampoline) {
            no_old_new_tile = MV_START_TRAMPOLINE;
        } else {
            no_old_new_tile = MV_TILE_SAME;
        }
        return no_old_new_tile;
    }
}

function isVerticallyNear(the_objects, x_ind, ndx_y100, z_ind) {
    const o_walkway_tiles = the_objects.o_walkway_tiles;
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    if (o_walkway_tiles.has(tile_index)) {
        return true;
    }
    return false;
}

function verticallyNearSS(the_objects, x_ind, ndx_y100, z_ind, prev_hex, is_a_trampoline) {
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    const c_move_result = moveToSs(the_objects, prev_hex, tile_index, is_a_trampoline);
    return c_move_result;
}

function verticallyNearNE(the_objects, x_ind, ndx_y100, z_ind, prev_hex, is_a_trampoline) {
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    const c_move_result = moveToNe(the_objects, prev_hex, tile_index, is_a_trampoline);
    return c_move_result;
}

function verticallyNearSE(the_objects, x_ind, ndx_y100, z_ind, prev_hex, is_a_trampoline) {
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    const c_move_result = moveToSe(the_objects, prev_hex, tile_index, is_a_trampoline);
    return c_move_result;
}

function verticallyNearSW(the_objects, x_ind, ndx_y100, z_ind, prev_hex, is_a_trampoline) {
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    const c_move_result = moveToSw(the_objects, prev_hex, tile_index, is_a_trampoline);
    return c_move_result;
}

function verticallyNearNW(the_objects, x_ind, ndx_y100, z_ind, prev_hex, is_a_trampoline) {
    let tile_index = hexIndex(x_ind, ndx_y100, z_ind);
    const c_move_result = moveToNw(the_objects, prev_hex, tile_index, is_a_trampoline);
    return c_move_result;
}

function nearTestSS(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 100, ndx_z)) {
        return verticallyNearSS(the_objects, ndx_x, ndx_y100 + 100, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 50, ndx_z)) {
        return verticallyNearSS(the_objects, ndx_x, ndx_y100 + 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 50, ndx_z)) {
        return verticallyNearSS(the_objects, ndx_x, ndx_y100 - 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 100, ndx_z)) {
        return verticallyNearSS(the_objects, ndx_x, ndx_y100 - 100, ndx_z, prev_hex, is_a_trampoline);
    }
    return verticallyNearSS(the_objects, ndx_x, ndx_y100 + 0, ndx_z, prev_hex, is_a_trampoline);
}

function nearTestNE(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 100, ndx_z)) {
        return verticallyNearNE(the_objects, ndx_x, ndx_y100 + 100, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 50, ndx_z)) {
        return verticallyNearNE(the_objects, ndx_x, ndx_y100 + 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 50, ndx_z)) {
        return verticallyNearNE(the_objects, ndx_x, ndx_y100 - 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 100, ndx_z)) {
        return verticallyNearNE(the_objects, ndx_x, ndx_y100 - 100, ndx_z, prev_hex, is_a_trampoline);
    }
    return verticallyNearNE(the_objects, ndx_x, ndx_y100 + 0, ndx_z, prev_hex, is_a_trampoline);
}

function nearTestSW(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 100, ndx_z)) {
        return verticallyNearSW(the_objects, ndx_x, ndx_y100 + 100, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 50, ndx_z)) {
        return verticallyNearSW(the_objects, ndx_x, ndx_y100 + 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 50, ndx_z)) {
        return verticallyNearSW(the_objects, ndx_x, ndx_y100 - 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 100, ndx_z)) {
        return verticallyNearSW(the_objects, ndx_x, ndx_y100 - 100, ndx_z, prev_hex, is_a_trampoline);
    }
    return verticallyNearSW(the_objects, ndx_x, ndx_y100 + 0, ndx_z, prev_hex, is_a_trampoline);
}

function nearTestNW(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 100, ndx_z)) {
        return verticallyNearNW(the_objects, ndx_x, ndx_y100 + 100, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 50, ndx_z)) {
        return verticallyNearNW(the_objects, ndx_x, ndx_y100 + 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 50, ndx_z)) {
        return verticallyNearNW(the_objects, ndx_x, ndx_y100 - 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 100, ndx_z)) {
        return verticallyNearNW(the_objects, ndx_x, ndx_y100 - 100, ndx_z, prev_hex, is_a_trampoline);
    }
    return verticallyNearNW(the_objects, ndx_x, ndx_y100 + 0, ndx_z, prev_hex, is_a_trampoline);
}

function nearTestSE(the_objects, ndx_x, ndx_y100, ndx_z, prev_hex, is_a_trampoline) {
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 100, ndx_z)) {
        return verticallyNearSE(the_objects, ndx_x, ndx_y100 + 100, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 + 50, ndx_z)) {
        return verticallyNearSE(the_objects, ndx_x, ndx_y100 + 50, ndx_z, prev_hex, is_a_trampoline);
    }

    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 50, ndx_z)) {
        return verticallyNearSE(the_objects, ndx_x, ndx_y100 - 50, ndx_z, prev_hex, is_a_trampoline);
    }
    if (isVerticallyNear(the_objects, ndx_x, ndx_y100 - 100, ndx_z)) {
        return verticallyNearSE(the_objects, ndx_x, ndx_y100 - 100, ndx_z, prev_hex, is_a_trampoline);
    }

    return verticallyNearSE(the_objects, ndx_x, ndx_y100 + 0, ndx_z, prev_hex, is_a_trampoline);
}

/*
 z
----------------------------------x
 |
 |
 https://www.quora.com/How-would-you-find-the-angle-of-a-line-given-two-points-on-a-coordinate-plan
Compute the vector components:
dx = x2 − x1
dy = y2 − y1
Compute the angle in radians:
θ = atan2(dy, dx)


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

function moveDirectionCoords2(prev_x_coord, prev_z_coord, new_x_coord, new_z_coord) {
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

export { transition2NewTile };
