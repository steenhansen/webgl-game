import { ee, tt, EE, TT } from "../../console-short.js";

import * as HEX_CONST from "../../constants.js";

import { tileCenterCoord, coords2HexIndexes } from "../hex-tile.js";
import { hexIndex, stripYindex } from "../hex-routines.js";

import { moveToNn } from "../nn/nn-move.js";
import { moveToNe } from "../ne/ne-move.js";
import { moveToNw } from "../nw/nw-move.js";
import { moveToSs } from "../ss/ss-move.js";

import { moveToSw } from "../sw/sw-move.js";

import { moveToSe } from "../se/se-move.js";

function verticallyNearNN(x_ind, level_y, z_ind, current_data) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    current_data.new_index = tile_index;
    const move_result = moveToNn(current_data);

    return { move_result, level_y };
}

//       cur_y_100_pos = cur_y_100_pos - 0.5;    wayyyy to fast !!!
function nearTestNN(walkway_tiles, new_x_ind, cur_level_y_100, new_z_ind, current_data) {
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 100, new_z_ind)) {
        return verticallyNearNN(new_x_ind, cur_level_y_100 + 100, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 50, new_z_ind)) {
        return verticallyNearNN(new_x_ind, cur_level_y_100 + 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 50, new_z_ind)) {
        return verticallyNearNN(new_x_ind, cur_level_y_100 - 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 100, new_z_ind)) {
        return verticallyNearNN(new_x_ind, cur_level_y_100 - 100, new_z_ind, current_data);
    }
    return verticallyNearNN(new_x_ind, cur_level_y_100 + 0, new_z_ind, current_data);
}

function transition2Tile(run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_pos, new_pos) {
    let cur_level_y = new_pos.y;
    ///////////////////////
    let y_100_index = new_pos.y;

    let y_index = y_100_index / 100;

    let y_frac = y_index % 1;

    let y_100_frac = y_frac * 100;

    let on_meeting_hinge_height = y_frac == 5 || y_frac == 0;
    if (!on_meeting_hinge_height) {
        const falling_between_levels = { move_result: HEX_CONST.MOVE_FALLING, level_y: cur_level_y };
        return falling_between_levels;
    }

    let [prev_x_ind, prev_z_ind] = coords2HexIndexes(prev_pos.x, prev_pos.z);
    let [new_x_ind, new_z_ind] = coords2HexIndexes(new_pos.x, new_pos.z);
    let move_dir = moveDirectionCoords2(prev_pos.x, prev_pos.z, new_pos.x, new_pos.z);
    let prev_index = hexIndex(prev_x_ind, prev_pos.y, prev_z_ind);
    let new_index = hexIndex(new_x_ind, new_pos.y, new_z_ind);
    let no_old_new_tile;

    const current_data = { run_or_test, print_allowed, walkway_tiles, walkway_columns, wall_squares, wall_columns, prev_index, new_index };
    if (move_dir == HEX_CONST.MOVE_NN) {
        return nearTestNN(walkway_tiles, new_x_ind, cur_level_y, new_z_ind, current_data);
    } else if (move_dir == HEX_CONST.MOVE_NE) {
        return nearTestNE(walkway_tiles, new_x_ind, cur_level_y, new_z_ind, current_data);
    } else if (move_dir == HEX_CONST.MOVE_SS) {
        return nearTestSS(walkway_tiles, new_x_ind, cur_level_y, new_z_ind, current_data);
    } else if (move_dir == HEX_CONST.MOVE_SW) {
        return nearTestSW(walkway_tiles, new_x_ind, cur_level_y, new_z_ind, current_data);
    } else if (move_dir == HEX_CONST.MOVE_NW) {
        return nearTestNW(walkway_tiles, new_x_ind, cur_level_y, new_z_ind, current_data);
    } else if (move_dir == HEX_CONST.MOVE_SE) {
        return nearTestSE(walkway_tiles, new_x_ind, cur_level_y, new_z_ind, current_data);
    } else {
        //  tt("waht dircection??", move_dir);
        no_old_new_tile = HEX_CONST.MOVE_NEW_TILE; //"unknown tile condition";
        return { move_result: no_old_new_tile, level_y: cur_level_y };
    }
}

function isVerticallyNear(walkway_tiles, x_ind, level_y, z_ind) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    if (walkway_tiles.has(tile_index)) {
        return true;
    }
    return false;
}

function verticallyNearSS(x_ind, level_y, z_ind, current_data) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    current_data.new_index = tile_index;
    const move_result = moveToSs(current_data);
    return { move_result, level_y };
}

function verticallyNearNE(x_ind, level_y, z_ind, current_data) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    current_data.new_index = tile_index;
    const move_result = moveToNe(current_data);
    return { move_result, level_y };
}

function verticallyNearSE(x_ind, level_y, z_ind, current_data) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    current_data.new_index = tile_index;
    const move_result = moveToSe(current_data);
    return { move_result, level_y };
}

function verticallyNearSW(x_ind, level_y, z_ind, current_data) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    current_data.new_index = tile_index;
    const move_result = moveToSw(current_data);
    return { move_result, level_y };
}

function verticallyNearNW(x_ind, level_y, z_ind, current_data) {
    let tile_index = hexIndex(x_ind, level_y, z_ind);
    current_data.new_index = tile_index;
    const move_result = moveToNw(current_data);
    return { move_result, level_y };
}

function nearTestSS(walkway_tiles, new_x_ind, cur_level_y_100, new_z_ind, current_data) {
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 100, new_z_ind)) {
        return verticallyNearSS(new_x_ind, cur_level_y_100 + 100, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 50, new_z_ind)) {
        return verticallyNearSS(new_x_ind, cur_level_y_100 + 50, new_z_ind, current_data);
    }

    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 50, new_z_ind)) {
        return verticallyNearSS(new_x_ind, cur_level_y_100 - 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 100, new_z_ind)) {
        return verticallyNearSS(new_x_ind, cur_level_y_100 - 100, new_z_ind, current_data);
    }

    return verticallyNearSS(new_x_ind, cur_level_y_100 + 0, new_z_ind, current_data);
}

function nearTestNE(walkway_tiles, new_x_ind, cur_level_y_100, new_z_ind, current_data) {
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 100, new_z_ind)) {
        return verticallyNearNE(new_x_ind, cur_level_y_100 + 100, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 50, new_z_ind)) {
        return verticallyNearNE(new_x_ind, cur_level_y_100 + 50, new_z_ind, current_data);
    }

    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 50, new_z_ind)) {
        return verticallyNearNE(new_x_ind, cur_level_y_100 - 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 100, new_z_ind)) {
        return verticallyNearNE(new_x_ind, cur_level_y_100 - 100, new_z_ind, current_data);
    }

    return verticallyNearNE(new_x_ind, cur_level_y_100 + 0, new_z_ind, current_data);
}

function nearTestSW(walkway_tiles, new_x_ind, cur_level_y_100, new_z_ind, current_data) {
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 100, new_z_ind)) {
        return verticallyNearSW(new_x_ind, cur_level_y_100 + 100, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 50, new_z_ind)) {
        return verticallyNearSW(new_x_ind, cur_level_y_100 + 50, new_z_ind, current_data);
    }

    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 50, new_z_ind)) {
        return verticallyNearSW(new_x_ind, cur_level_y_100 - 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 100, new_z_ind)) {
        return verticallyNearSW(new_x_ind, cur_level_y_100 - 100, new_z_ind, current_data);
    }

    return verticallyNearSW(new_x_ind, cur_level_y_100 + 0, new_z_ind, current_data);
}

function nearTestNW(walkway_tiles, new_x_ind, cur_level_y_100, new_z_ind, current_data) {
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 100, new_z_ind)) {
        return verticallyNearNW(new_x_ind, cur_level_y_100 + 100, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 50, new_z_ind)) {
        return verticallyNearNW(new_x_ind, cur_level_y_100 + 50, new_z_ind, current_data);
    }

    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 50, new_z_ind)) {
        return verticallyNearNW(new_x_ind, cur_level_y_100 - 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 100, new_z_ind)) {
        return verticallyNearNW(new_x_ind, cur_level_y_100 - 100, new_z_ind, current_data);
    }

    return verticallyNearNW(new_x_ind, cur_level_y_100 + 0, new_z_ind, current_data);
}

function nearTestSE(walkway_tiles, new_x_ind, cur_level_y_100, new_z_ind, current_data) {
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 100, new_z_ind)) {
        return verticallyNearSE(new_x_ind, cur_level_y_100 + 100, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 + 50, new_z_ind)) {
        return verticallyNearSE(new_x_ind, cur_level_y_100 + 50, new_z_ind, current_data);
    }

    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 50, new_z_ind)) {
        return verticallyNearSE(new_x_ind, cur_level_y_100 - 50, new_z_ind, current_data);
    }
    if (isVerticallyNear(walkway_tiles, new_x_ind, cur_level_y_100 - 100, new_z_ind)) {
        return verticallyNearSE(new_x_ind, cur_level_y_100 - 100, new_z_ind, current_data);
    }

    return verticallyNearSE(new_x_ind, cur_level_y_100 + 0, new_z_ind, current_data);
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
        move_direction = HEX_CONST.MOVE_NO;
    } else {
        if (theta >= NE_START_0D && theta < NE_END_60D) {
            //    ee("*** NE");
            move_direction = HEX_CONST.MOVE_NE;
        } else if (theta >= NN_START_60D && theta < NN_END_120D) {
            //  ee("*** NN");
            move_direction = HEX_CONST.MOVE_NN;
        } else if (theta >= NW_START_120D && theta <= NW_END_180D) {
            //   ee("*** NW");
            move_direction = HEX_CONST.MOVE_NW;
        } else if (theta <= SW_START_180D && theta >= SW_END_240D) {
            //   ee("*** SW");
            move_direction = HEX_CONST.MOVE_SW;
        } else if (theta <= SS_START_240D && theta > SS_END_300D) {
            //   ee("*** SS");
            move_direction = HEX_CONST.MOVE_SS;
        } else if (theta <= SE_START_300D && theta > SE_END_0D) {
            //    ee("*** SE");
            move_direction = HEX_CONST.MOVE_SE;
        } else {
            ee("*** NOT SURE  THETA--=", theta);
            move_direction = HEX_CONST.MOVE_NO;
        }
    }
    return move_direction;
}

export { transition2Tile };
