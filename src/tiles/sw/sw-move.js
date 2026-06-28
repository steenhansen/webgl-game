import { ee, tt, dd, EE, TT, DD } from "../../misc/console-short.js";

import { MV_TILE_SAME, TILT_SS, TILT_NONE, TILT_NN, TILT_NE, TILT_SE, TILT_SW, TILT_NW } from "../../values/the-constants.js";
import { tileData, offWalkway, hitFence } from "../hex-routines.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, undefTileDebugInfo, moveBlock, moveNew, moveSame } from "../ground-tiles.js";
import {
    SW_WALK_AIR,
    SW_TRAMPOLINE_AIR,
    SW_0_SAME,
    SW_1_UP_UP_CLOCK,
    SW_2_UP_UP_COUNTER,
    SW_3_DOWN_DOWN_CLOCK,
    SW_4_DOWN_DOWN_COUNTER,
    SW_5_FLAT__FLAT,
    SW_6_FLAT__UP,
    SW_7_UP__FLAT,
    SW_8_DOWN__FLAT,
    SW_9_FLAT__DOWN,
    SW_10_UP__UP,
    SW_11_DOWN__DOWN,
    SW_12_UP__DOWN,
    SW_13_DOWN__UP,
    SW_14_BLOCKED,
    SW_15_TRAMPOLINE,
    SW_16_STROLL_INTO_AIR,
    SW_17_DESCEND_ONE_STEP
} from "./sw-constants.js";

function leaveTileSW(the_objects, this_hex, prev_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls } = the_objects;
    const is_off_walkway = offWalkway(o_walkway_columns, this_hex);
    let move_result;
    if (prev_hex == this_hex) {
        move_result = moveSame(SW_0_SAME, prev_hex, this_hex);
    } else if (hitFence(o_fence_walls, prev_hex, this_hex)) {
        move_result = moveBlock(SW_14_BLOCKED, prev_hex, this_hex);
        console.log("SW Block");
    } else if (is_off_walkway && is_a_trampoline) {
        move_result = moveOntoTrampoline(SW_15_TRAMPOLINE, prev_hex, this_hex);
    } else if (is_off_walkway) {
        move_result = moveIntoAir(SW_16_STROLL_INTO_AIR, prev_hex, this_hex);
    } else {
        move_result = tile2TileSW(o_walkway_tiles, this_hex, prev_hex);
    }
    return move_result;
}

function tile2TileSW(o_walkway_tiles, this_hex, prev_hex) {
    const { prev_new_data, tile_data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = tile_data;
    let move_result;
    if (swCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SW_1_UP_UP_CLOCK, prev_hex, this_hex); //      ⭮
    } else if (swCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SW_2_UP_UP_COUNTER, prev_hex, this_hex); //      ⭯
    } else if (swCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SW_3_DOWN_DOWN_CLOCK, prev_hex, this_hex); //  ⭮
    } else if (swCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(SW_4_DOWN_DOWN_COUNTER, prev_hex, this_hex); //  ⭯              http://xahlee.info/comp/unicode_arrows.html
    } else if (swFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(SW_5_FLAT__FLAT, prev_hex, this_hex); // - -
    } else if (swFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(SW_6_FLAT__UP, prev_hex, this_hex); //   _⭜
    } else if (swUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(SW_7_UP__FLAT, prev_hex, this_hex); //   ↗¯¯
    } else if (swDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(SW_8_DOWN__FLAT, prev_hex, this_hex); // ↘__
    } else if (swFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(SW_9_FLAT__DOWN, prev_hex, this_hex); // ¯⭝
    } else if (swUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        move_result = moveNew(SW_10_UP__UP, prev_hex, this_hex); //     ↗↗
    } else if (swDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(SW_11_DOWN__DOWN, prev_hex, this_hex); // ↘↘
    } else if (swUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(SW_12_UP__DOWN, prev_hex, this_hex); //  ↗↘
    } else if (swDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(SW_13_DOWN__UP, prev_hex, this_hex); //  ↘↗
    } else if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        move_result = moveDescendOneStep(SW_17_DESCEND_ONE_STEP, prev_hex, this_hex); // ⬎_   ??????? does this ever get gotton to ?   MV_FALL_STEP_OFF
    } else {
        ee("should never happen SW, move_result", move_result);
    }
    return move_result;
}

/*  curve_up__curve_up.png   like a flower */
function swCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_SS = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SS;
    if (SE_to_SS && lows_and_highs) {
        ee("FLOWER CLOCK sw");
        return true;
    }
    return false;
}

function swCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NW = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NW;
    if (NN_to_NW && lows_and_highs) {
        ee("FLOWER COUNT sw");
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function swCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_NN = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NN;
    if (NW_to_NN && lows_and_highs) {
        ee("hat CLOCK sw");
        return true;
    }
    return false;
}

function swCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SE;
    if (SS_to_SE && lows_and_highs) {
        ee("hat COUNT sw");
        return true;
    }
    return false;
}

function swFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function swFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_2_SW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SW;
    if (NONE_2_SW && low_to_low) {
        return true;
    }
    return false;
}

function swUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const SW_2_NONE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NONE;
    if (SW_2_NONE && high_to_high) {
        return true;
    }
    return false;
}

function swDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NE_2_NONE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NONE;
    if (NE_2_NONE && low_to_low) {
        return true;
    }
    return false;
}

function swFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_2_NE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NE;
    if (NONE_2_NE && high_to_high) {
        return true;
    }
    return false;
}

function swUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const SW_2_SW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SW;
    if (SW_2_SW && high_to_low) {
        return true;
    }
    return false;
}

function swDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const NE_2_NE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NE;
    if (NE_2_NE && low_to_high) {
        return true;
    }
    return false;
}

function swUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const SW_2_NE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NE;
    if (SW_2_NE && high_to_high) {
        return true;
    }
    return false;
}

function swDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NE_2_SW = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SW;
    if (NE_2_SW && low_to_low) {
        return true;
    }
    return false;
}

export { leaveTileSW };
