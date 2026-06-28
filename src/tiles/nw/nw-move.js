import { ee, tt, dd, EE, TT, DD } from "../../misc/console-short.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, moveBlock, moveNew, moveSame } from "../ground-tiles.js";
import { MV_TILE_SAME, TILT_SS, TILT_NONE, TILT_NN, TILT_NE, TILT_SE, TILT_SW, TILT_NW } from "../../values/the-constants.js";
import { tileData, offWalkway, hitFence } from "../hex-routines.js";

import {
    NW_WALK_AIR,
    NW_TRAMPOLINE_AIR,
    NW_0_SAME,
    NW_1_UP_UP_CLOCK,
    NW_2_UP_UP_COUNTER,
    NW_3_DOWN_DOWN_CLOCK,
    NW_4_DOWN_DOWN_COUNTER,
    NW_5_FLAT__FLAT,
    NW_6_FLAT__UP,
    NW_7_UP__FLAT,
    NW_8_DOWN__FLAT,
    NW_9_FLAT__DOWN,
    NW_10_UP__UP,
    NW_11_DOWN__DOWN,
    NW_12_UP__DOWN,
    NW_13_DOWN__UP,
    NW_14_BLOCKED,
    NW_15_TRAMPOLINE,
    NW_16_STROLL_INTO_AIR,
    NW_17_DESCEND_ONE_STEP
} from "./nw-constants.js";

function tile2TileNW(o_walkway_tiles, this_hex, prev_hex) {
    const { prev_new_data, tile_data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = tile_data;
    let move_result;
    if (nwCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NW_1_UP_UP_CLOCK, prev_hex, this_hex); //      ⭮
    } else if (nwCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NW_2_UP_UP_COUNTER, prev_hex, this_hex); //      ⭯
    } else if (nwCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NW_3_DOWN_DOWN_CLOCK, prev_hex, this_hex); //  ⭮
    } else if (nwCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NW_4_DOWN_DOWN_COUNTER, prev_hex, this_hex); //  ⭯              http://xahlee.info/comp/unicode_arrows.html
    } else if (nwFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(NW_5_FLAT__FLAT, prev_hex, this_hex); // - -
    } else if (nwFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(NW_6_FLAT__UP, prev_hex, this_hex); //   _⭜
    } else if (nwUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(NW_7_UP__FLAT, prev_hex, this_hex); //   ↗¯¯
    } else if (nwDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(NW_8_DOWN__FLAT, prev_hex, this_hex); // ↘__
    } else if (nwFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(NW_9_FLAT__DOWN, prev_hex, this_hex); // ¯⭝
    } else if (nwUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        move_result = moveNew(NW_10_UP__UP, prev_hex, this_hex); //     ↗↗
    } else if (nwDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(NW_11_DOWN__DOWN, prev_hex, this_hex); // ↘↘
    } else if (nwUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(NW_12_UP__DOWN, prev_hex, this_hex); //  ↗↘
    } else if (nwDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(NW_13_DOWN__UP, prev_hex, this_hex); //  ↘↗
    } else if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        move_result = moveDescendOneStep(NW_17_DESCEND_ONE_STEP, prev_hex, this_hex); // ⬎_   ??????? does this ever get gotton to ?   MV_FALL_STEP_OFF
    } else {
        ee("should never happen NW, move_result", move_result);
    }
    return move_result;
}

function leaveTileNW(the_objects, this_hex, prev_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls } = the_objects;
    const is_off_walkway = offWalkway(o_walkway_columns, this_hex);
    let move_result;
    if (prev_hex == this_hex) {
        move_result = moveSame(NW_0_SAME, prev_hex, this_hex);
    } else if (hitFence(o_fence_walls, prev_hex, this_hex)) {
        move_result = moveBlock(NW_14_BLOCKED, prev_hex, this_hex);
        console.log("NW Block");
    } else if (is_off_walkway && is_a_trampoline) {
        move_result = moveOntoTrampoline(NW_15_TRAMPOLINE, prev_hex, this_hex);
    } else if (is_off_walkway) {
        move_result = moveIntoAir(NW_16_STROLL_INTO_AIR, prev_hex, this_hex);
    } else {
        move_result = tile2TileNW(o_walkway_tiles, this_hex, prev_hex);
    }
    return move_result;
}

/*  curve_up__curve_up.png   like a flower */
function nwCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SW = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SW;
    if (SS_to_SW && lows_and_highs) {
        ee("FLOWER CLOCK nw");
        return true;
    }
    return false;
}

function nwCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NE_to_NN = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NN;
    if (NE_to_NN && lows_and_highs) {
        ee("FLOWER COUNT nw");
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function nwCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NE = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NE;
    if (NN_to_NE && lows_and_highs) {
        return true;
    }
    return false;
}

function nwCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SW_to_SS = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SS;
    if (SW_to_SS && lows_and_highs) {
        ee("hat COUNT nw");
        return true;
    }
    return false;
}

function nwFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function nwFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NW;
    if (NONE_to_NW && low_to_low) {
        return true;
    }
    return false;
}

function nwUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const NW_to_NONE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NONE;
    if (NW_to_NONE && high_to_high) {
        return true;
    }
    return false;
}

function nwDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const SE_to_NONE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NONE;
    if (SE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function nwFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_to_SE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SE;
    if (NONE_to_SE && high_to_high) {
        return true;
    }
    return false;
}

function nwUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const NW_to_NW = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NW;
    if (NW_to_NW && high_to_low) {
        return true;
    }
    return false;
}

function nwDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const SE_to_SE = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SE;
    if (SE_to_SE && low_to_high) {
        return true;
    }
    return false;
}

function nwUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NW_to_SE = prev_tilt_up == TILT_NW && new_tilt_up == TILT_SE;
    if (NW_to_SE && high_to_high) {
        return true;
    }
    return false;
}

function nwDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const SE_to_NW = prev_tilt_up == TILT_SE && new_tilt_up == TILT_NW;
    if (SE_to_NW && low_to_low) {
        return true;
    }
    return false;
}

export { leaveTileNW };
