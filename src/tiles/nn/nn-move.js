import { ee, tt, dd, EE, TT, DD } from "../../misc/console-short.js";

import {
    MV_FENCE_BLOCKED,
    MV_FALL_STEP_OFF,
    MV_TILE_SAME,
    MV_TILE_NEW,
    TILT_SS,
    TILT_NONE,
    TILT_NN,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NW
} from "../../values/the-constants.js";
import { tileData, offWalkway, hitFence } from "../hex-routines.js";

import {
    NN_0_SAME,
    NN_1_UP_UP_CLOCK,
    NN_2_UP_UP_COUNTER,
    NN_3_DOWN_DOWN_CLOCK,
    NN_4_DOWN_DOWN_COUNTER,
    NN_5_FLAT__FLAT,
    NN_6_FLAT__UP,
    NN_7_UP__FLAT,
    NN_8_DOWN__FLAT,
    NN_9_FLAT__DOWN,
    NN_10_UP__UP,
    NN_11_DOWN__DOWN,
    NN_12_UP__DOWN,
    NN_13_DOWN__UP,
    NN_14_BLOCKED,
    NN_15_STROLL_INTO_AIR,
    NN_16_DESCEND_ONE_STEP
} from "./nn-constants.js";

function moveDescendOneStepNn(nn_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.NN[nn_dir];
    return MV_FALL_STEP_OFF;
}

function moveIntoAirNn(nn_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.NN[nn_dir];
    return MV_FALL_STEP_OFF;
}

function moveBlockNn(nn_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.NN[nn_dir];
    return MV_FENCE_BLOCKED;
}

function moveSameNn(nn_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.NN[nn_dir];
    return MV_TILE_SAME;
}

function moveNewNn(nn_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.NN[nn_dir];
    return MV_TILE_NEW;
}

function nnFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NN = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NN;
    if (NONE_to_NN && low_to_low) {
        return true;
    }
    return false;
}

function nnFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_to_SS = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SS;
    if (NONE_to_SS && high_to_high) {
        return true;
    }
    return false;
}

function tile2TileNN(o_walkway_tiles, this_hex, prev_hex) {
    const { prev_new_data, tile_data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = tile_data;
    let move_result;
    if (nnCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewNn(NN_1_UP_UP_CLOCK, prev_hex, this_hex); //      ⭮
    } else if (nnCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewNn(NN_2_UP_UP_COUNTER, prev_hex, this_hex); //      ⭯
    } else if (nnCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewNn(NN_3_DOWN_DOWN_CLOCK, prev_hex, this_hex); //  ⭮
    } else if (nnCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewNn(NN_4_DOWN_DOWN_COUNTER, prev_hex, this_hex); //  ⭯              http://xahlee.info/comp/unicode_arrows.html
    } else if (nnFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNewNn(NN_5_FLAT__FLAT, prev_hex, this_hex); // - -
    } else if (nnFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNewNn(NN_6_FLAT__UP, prev_hex, this_hex); //   _⭜
    } else if (nnUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNewNn(NN_7_UP__FLAT, prev_hex, this_hex); //   ↗¯¯
    } else if (nnDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNewNn(NN_8_DOWN__FLAT, prev_hex, this_hex); // ↘__
    } else if (nnFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNewNn(NN_9_FLAT__DOWN, prev_hex, this_hex); // ¯⭝
    } else if (nnUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        move_result = moveNewNn(NN_10_UP__UP, prev_hex, this_hex); //     ↗↗
    } else if (nnDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNewNn(NN_11_DOWN__DOWN, prev_hex, this_hex); // ↘↘
    } else if (nnUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNewNn(NN_12_UP__DOWN, prev_hex, this_hex); //  ↗↘
    } else if (nnDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNewNn(NN_13_DOWN__UP, prev_hex, this_hex); //  ↘↗
    } else if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        move_result = moveDescendOneStepNn(NN_16_DESCEND_ONE_STEP, prev_hex, this_hex); // ⬎_   ??????? does this ever get gotton to ?
    } else {
        move_result = moveBlockNn(NN_14_BLOCKED, prev_hex, this_hex);
    }
    return move_result;
}

function leaveTileNN(the_objects, this_hex, prev_hex) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls } = the_objects;
    const is_off_walkway = offWalkway(o_walkway_columns, this_hex);
    let move_result;
    //  0,1100,-6      <>   0,1200,-6         ["0", 1100, "-6", TILT_SS, INCLINE___1]
    if (prev_hex == this_hex) {
        move_result = moveSameNn(NN_0_SAME, prev_hex, this_hex);
    } else if (hitFence(o_fence_walls, prev_hex, this_hex)) {
        move_result = moveBlockNn(NN_14_BLOCKED, prev_hex, this_hex);
    } else if (is_off_walkway) {
        move_result = moveIntoAirNn(NN_15_STROLL_INTO_AIR, prev_hex, this_hex); //???
    } else {
        move_result = tile2TileNN(o_walkway_tiles, this_hex, prev_hex);
    }
    return move_result;
}

function nnFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

/*  curve_up__curve_up.png   like a flower */
function nnCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_NW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NW;
    if (SW_to_NW && lows_and_highs) {
        return true;
    }
    return false;
}

function nnCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_NE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NE;
    if (SE_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function nnCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_SE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SE;
    if (NE_to_SE && lows_and_highs) {
        return true;
    }
    return false;
}

function nnCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_SW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SW;
    if (NW_to_SW && lows_and_highs) {
        return true;
    }
    return false;
}

function nnUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const NN_to_NONE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NONE;
    if (NN_to_NONE && high_to_high) {
        return true;
    }
    return false;
}

function nnDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const SS_to_NONE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NONE;
    if (SS_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function nnUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const NN_to_NN = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NN;
    if (NN_to_NN && high_to_low) {
        return true;
    }
    return false;
}

function nnDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const SS_to_SS = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SS;
    if (SS_to_SS && low_to_high) {
        return true;
    }
    return false;
}

function nnUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NN_to_SS = prev_tilt_up == TILT_NN && new_tilt_up == TILT_SS;
    if (NN_to_SS && high_to_high) {
        return true;
    }
    return false;
}

function nnDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const SS_to_NN = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NN;
    if (SS_to_NN && low_to_low) {
        return true;
    }
    return false;
}

export { leaveTileNN };
