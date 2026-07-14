import { ee, tt, dd, EE, TT, DD } from "../../misc/console-short.js";
import {
    MV_FENCE_BLOCKED,
    MV_FALL_STEP_OFF,
    MV_TILE_NEW,
    MV_TILE_SAME,
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
    SE_0_SAME,
    SE_1_UP_UP_CLOCK,
    SE_2_UP_UP_COUNTER,
    SE_3_DOWN_DOWN_CLOCK,
    SE_4_DOWN_DOWN_COUNTER,
    SE_5_FLAT__FLAT,
    SE_6_FLAT__UP,
    SE_7_UP__FLAT,
    SE_8_DOWN__FLAT,
    SE_9_FLAT__DOWN,
    SE_10_UP__UP,
    SE_11_DOWN__DOWN,
    SE_12_UP__DOWN,
    SE_13_DOWN__UP,
    SE_14_BLOCKED,
    SE_15_STROLL_INTO_AIR,
    SE_16_DESCEND_ONE_STEP
} from "./se-constants.js";

function moveDescendOneStepSe(se_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.SE[se_dir];
    return MV_FALL_STEP_OFF;
}

function moveIntoAirSe(se_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.SE[se_dir];
    return MV_FALL_STEP_OFF;
}

function moveBlockSe(se_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.SE[se_dir];
    return MV_FENCE_BLOCKED;
    s;
}

function moveSameSe(se_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.SE[se_dir];
    return MV_TILE_SAME;
}

function moveNewSe(se_dir, prev_hex, this_hex) {
    delete window.HEX_VARS.TEST_MOVE_TYPES.SE[se_dir];
    return MV_TILE_NEW;
}

function tile2TileSE(o_walkway_tiles, this_hex, prev_hex) {
    const { prev_new_data, tile_data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = tile_data;
    let move_result;
    if (seCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewSe(SE_1_UP_UP_CLOCK, prev_hex, this_hex); //      ⭮
    } else if (seCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewSe(SE_2_UP_UP_COUNTER, prev_hex, this_hex); //      ⭯
    } else if (seCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewSe(SE_3_DOWN_DOWN_CLOCK, prev_hex, this_hex); //  ⭮
    } else if (seCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNewSe(SE_4_DOWN_DOWN_COUNTER, prev_hex, this_hex); //  ⭯              http://xahlee.info/comp/unicode_arrows.html
    } else if (seFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNewSe(SE_5_FLAT__FLAT, prev_hex, this_hex); // - -
    } else if (seFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNewSe(SE_6_FLAT__UP, prev_hex, this_hex); //   _⭜
    } else if (seUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNewSe(SE_7_UP__FLAT, prev_hex, this_hex); //   ↗¯¯
    } else if (seDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNewSe(SE_8_DOWN__FLAT, prev_hex, this_hex); // ↘__
    } else if (seFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNewSe(SE_9_FLAT__DOWN, prev_hex, this_hex); // ¯⭝
    } else if (seUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        move_result = moveNewSe(SE_10_UP__UP, prev_hex, this_hex); //     ↗↗
    } else if (seDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNewSe(SE_11_DOWN__DOWN, prev_hex, this_hex); // ↘↘
    } else if (seUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNewSe(SE_12_UP__DOWN, prev_hex, this_hex); //  ↗↘
    } else if (seDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNewSe(SE_13_DOWN__UP, prev_hex, this_hex); //  ↘↗
    } else if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        move_result = moveDescendOneStepSe(SE_16_DESCEND_ONE_STEP, prev_hex, this_hex); // ⬎_   ??????? does this ever get gotton to ?   MV_FALL_STEP_OFF
    } else {
        move_result = moveBlockSe(SE_14_BLOCKED, prev_hex, this_hex);
    }
    return move_result;
}

function leaveTileSE(the_objects, this_hex, prev_hex) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls } = the_objects;
    const is_off_walkway = offWalkway(o_walkway_columns, this_hex);
    let move_result;
    if (prev_hex == this_hex) {
        move_result = moveSameSe(SE_0_SAME, prev_hex, this_hex);
    } else if (hitFence(o_fence_walls, prev_hex, this_hex)) {
        move_result = moveBlockSe(SE_14_BLOCKED, prev_hex, this_hex);
    } else if (is_off_walkway) {
        move_result = moveIntoAirSe(SE_15_STROLL_INTO_AIR, prev_hex, this_hex);
    } else {
        move_result = tile2TileSE(o_walkway_tiles, this_hex, prev_hex);
    }
    return move_result;
}

/*  curve_up__curve_up.png   like a flower */
function seCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NE;
    if (NN_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

function seCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_SS = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SS;
    if (SW_to_SS && lows_and_highs) {
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function seCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SW = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SW;
    if (SS_to_SW && lows_and_highs) {
        return true;
    }
    return false;
}

function seCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_NN = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NN;
    if (NE_to_NN && lows_and_highs) {
        return true;
    }
    return false;
}

function seFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function seFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_SE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SE;
    if (NONE_2_SE && low_to_low) {
        return true;
    }
    return false;
}

function seUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const SE_2_NONE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NONE;
    if (SE_2_NONE && high_to_high) {
        return true;
    }
    return false;
}

function seDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NW_2_NONE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NONE;
    if (NW_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function seFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_2_NW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NW;
    if (NONE_2_NW && high_to_high) {
        return true;
    }
    return false;
}

function seUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const SE_2_SE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SE;
    if (SE_2_SE && high_to_low) {
        return true;
    }
    return false;
}

function seDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const NW_2_NW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NW;
    if (NW_2_NW && low_to_high) {
        return true;
    }
    return false;
}

function seUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const SE_2_NW = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NW;
    if (SE_2_NW && high_to_high) {
        return true;
    }
    return false;
}

function seDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NW_2_SE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SE;
    if (NW_2_SE && low_to_low) {
        return true;
    }
    return false;
}

export { leaveTileSE };
