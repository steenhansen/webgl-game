import { ee, tt, dd, EE, TT, DD } from "../../misc/console-short.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, moveBlock, moveNew, moveSame } from "../ground-tiles.js";
import { MV_TILE_SAME, TILT_SS, TILT_NONE, TILT_NN, TILT_NE, TILT_SE, TILT_SW, TILT_NW } from "../../values/the-constants.js";
import { tileData, offWalkway, hitFence } from "../hex-routines.js";

import {
    SS_WALK_AIR,
    SS_TRAMPOLINE_AIR,
    SS_0_SAME,
    SS_1_UP_UP_CLOCK,
    SS_2_UP_UP_COUNTER,
    SS_3_DOWN_DOWN_CLOCK,
    SS_4_DOWN_DOWN_COUNTER,
    SS_5_FLAT__FLAT,
    SS_6_FLAT__UP,
    SS_7_UP__FLAT,
    SS_8_DOWN__FLAT,
    SS_9_FLAT__DOWN,
    SS_10_UP__UP,
    SS_11_DOWN__DOWN,
    SS_12_UP__DOWN,
    SS_13_DOWN__UP,
    SS_14_BLOCKED,
    SS_15_TRAMPOLINE,
    SS_16_STROLL_INTO_AIR,
    SS_17_DESCEND_ONE_STEP
} from "./ss-constants.js";

function tile2TileSS(o_walkway_tiles, this_hex, prev_hex) {
    const { prev_new_data, tile_data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = tile_data;
    let move_result;
    if (ssCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SS_1_UP_UP_CLOCK, prev_hex, this_hex); //      ⭮
    } else if (ssCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SS_2_UP_UP_COUNTER, prev_hex, this_hex); //      ⭯
    } else if (ssCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SS_3_DOWN_DOWN_CLOCK, prev_hex, this_hex); //  ⭮
    } else if (ssCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SS_4_DOWN_DOWN_COUNTER, prev_hex, this_hex); //  ⭯              http://xahlee.info/comp/unicode_arrows.html
    } else if (ssFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(SS_5_FLAT__FLAT, prev_hex, this_hex); // - -
    } else if (ssFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(SS_6_FLAT__UP, prev_hex, this_hex); //   _⭜
    } else if (ssUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(SS_7_UP__FLAT, prev_hex, this_hex); //   ↗¯¯
    } else if (ssDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(SS_8_DOWN__FLAT, prev_hex, this_hex); // ↘__
    } else if (ssFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(SS_9_FLAT__DOWN, prev_hex, this_hex); // ¯⭝
    } else if (ssUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        move_result = moveNew(SS_10_UP__UP, prev_hex, this_hex); //     ↗↗
    } else if (ssDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(SS_11_DOWN__DOWN, prev_hex, this_hex); // ↘↘
    } else if (ssUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(SS_12_UP__DOWN, prev_hex, this_hex); //  ↗↘
    } else if (ssDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(SS_13_DOWN__UP, prev_hex, this_hex); //  ↘↗
    } else if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        move_result = moveDescendOneStep(SS_17_DESCEND_ONE_STEP, prev_hex, this_hex); // ⬎_   ??????? does this ever get gotton to ?   MV_FALL_STEP_OFF
    } else {
        ee("should never happen SS, move_result", move_result);
    }
    return move_result;
}

function leaveTileSS(the_objects, this_hex, prev_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls } = the_objects;
    const is_off_walkway = offWalkway(o_walkway_columns, this_hex);
    let move_result;
    if (prev_hex == this_hex) {
        move_result = moveSame(SS_0_SAME, prev_hex, this_hex);
    } else if (hitFence(o_fence_walls, prev_hex, this_hex)) {
        move_result = moveBlock(SS_14_BLOCKED, prev_hex, this_hex);
        console.log("SS Block");
    } else if (is_off_walkway && is_a_trampoline) {
        move_result = moveOntoTrampoline(SS_15_TRAMPOLINE, prev_hex, this_hex);
    } else if (is_off_walkway) {
        move_result = moveIntoAir(SS_16_STROLL_INTO_AIR, prev_hex, this_hex);
    } else {
        move_result = tile2TileSS(o_walkway_tiles, this_hex, prev_hex);
    }
    return move_result;
}

/*  curve_up__curve_up.png   like a flower */
function ssCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_SE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SE;
    if (NE_to_SE && lows_and_highs) {
        return true;
    }
    return false;
}

function ssCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_SW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SW;
    if (NW_to_SW && lows_and_highs) {
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function ssCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_NW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NW;
    if (SW_to_NW && lows_and_highs) {
        return true;
    }
    return false;
}

function ssCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_NE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NE;
    if (SE_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

function ssFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function ssFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_SS = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SS;
    if (NONE_2_SS && low_to_low) {
        return true;
    }
    return false;
}

function ssUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const SS_2_NONE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NONE;
    if (SS_2_NONE && high_to_high) {
        return true;
    }
    return false;
}

function ssDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NN_2_NONE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NONE;
    if (NN_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function ssFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_2_NN = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NN;
    if (NONE_2_NN && high_to_high) {
        return true;
    }
    return false;
}

function ssUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const SS_2_SS = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SS;
    if (SS_2_SS && high_to_low) {
        return true;
    }
    return false;
}

function ssDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const NN_2_NN = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NN;
    if (NN_2_NN && low_to_high) {
        return true;
    }
    return false;
}

function ssUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const SS_2_NN = prev_tilt_up == TILT_SS && new_tilt_up == TILT_NN;
    if (SS_2_NN && high_to_high) {
        return true;
    }
    return false;
}

function ssDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NN_2_SS = prev_tilt_up == TILT_NN && new_tilt_up == TILT_SS;
    if (NN_2_SS && low_to_low) {
        return true;
    }
    return false;
}

export { leaveTileSS };
