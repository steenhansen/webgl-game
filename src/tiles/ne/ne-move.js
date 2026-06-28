import { ee, tt, dd, EE, TT, DD } from "../../misc/console-short.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, moveBlock, moveNew, moveSame } from "../ground-tiles.js";
import { MV_TILE_SAME, TILT_SS, TILT_NONE, TILT_NN, TILT_NE, TILT_SE, TILT_SW, TILT_NW } from "../../values/the-constants.js";
import { tileData, offWalkway, hitFence } from "../hex-routines.js";

import {
    NE_WALK_AIR,
    NE_TRAMPOLINE_AIR,
    NE_0_SAME,
    NE_1_UP_UP_CLOCK,
    NE_2_UP_UP_COUNTER,
    NE_3_DOWN_DOWN_CLOCK,
    NE_4_DOWN_DOWN_COUNTER,
    NE_5_FLAT__FLAT,
    NE_6_FLAT__UP,
    NE_7_UP__FLAT,
    NE_8_DOWN__FLAT,
    NE_9_FLAT__DOWN,
    NE_10_UP__UP,
    NE_11_DOWN__DOWN,
    NE_12_UP__DOWN,
    NE_13_DOWN__UP,
    NE_14_BLOCKED,
    NE_15_TRAMPOLINE,
    NE_16_STROLL_INTO_AIR,
    NE_17_DESCEND_ONE_STEP
} from "./ne-constants.js";

function tile2TileNE(o_walkway_tiles, this_hex, prev_hex) {
    const { prev_new_data, tile_data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = tile_data;
    let move_result = MV_TILE_SAME;
    if (neCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NE_1_UP_UP_CLOCK, prev_hex, this_hex); //      ⭮
    } else if (neCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NE_2_UP_UP_COUNTER, prev_hex, this_hex); //      ⭯
    } else if (neCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NE_3_DOWN_DOWN_CLOCK, prev_hex, this_hex); //  ⭮
    } else if (neCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, tile_data)) {
        move_result = moveNew(NE_4_DOWN_DOWN_COUNTER, prev_hex, this_hex); //  ⭯              http://xahlee.info/comp/unicode_arrows.html
    } else if (neFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(NE_5_FLAT__FLAT, prev_hex, this_hex); // - -
    } else if (neFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(NE_6_FLAT__UP, prev_hex, this_hex); //   _⭜
    } else if (neUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(NE_7_UP__FLAT, prev_hex, this_hex); //   ↗¯¯
    } else if (neDownToFlat(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(NE_8_DOWN__FLAT, prev_hex, this_hex); // ↘__
    } else if (neFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(NE_9_FLAT__DOWN, prev_hex, this_hex); // ¯⭝
    } else if (neUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        move_result = moveNew(NE_10_UP__UP, prev_hex, this_hex); //     ↗↗
    } else if (neDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        move_result = moveNew(NE_11_DOWN__DOWN, prev_hex, this_hex); // ↘↘
    } else if (neUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        move_result = moveNew(NE_12_UP__DOWN, prev_hex, this_hex); //  ↗↘
    } else if (neDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        move_result = moveNew(NE_13_DOWN__UP, prev_hex, this_hex); //  ↘↗
    } else if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        move_result = moveDescendOneStep(NE_17_DESCEND_ONE_STEP, prev_hex, this_hex); // ⬎_   ??????? does this ever get gotton to ?   MV_FALL_STEP_OFF
    } else {
        // NE Incline adjustment move from flat to declining
        // [2,1100,2] to [2,1000,2] occurs when flat(1100y) tile moves to declining(1000y) tile
        // 100 in height was immediately lost because second declining tile is at height 1000
        // because a tile's height is its lowest point.
        // tt("no-error", move_result, prev_hex, this_hex);
    }
    return move_result;
}

function leaveTileNE(the_objects, this_hex, prev_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls } = the_objects;
    const is_off_walkway = offWalkway(o_walkway_columns, this_hex);
    let move_result;
    if (prev_hex == this_hex) {
        move_result = moveSame(NE_0_SAME, prev_hex, this_hex);
    } else if (hitFence(o_fence_walls, prev_hex, this_hex)) {
        move_result = moveBlock(NE_14_BLOCKED, prev_hex, this_hex);
        console.log("NE Block");
    } else if (is_off_walkway && is_a_trampoline) {
        move_result = moveOntoTrampoline(NE_15_TRAMPOLINE, prev_hex, this_hex);
    } else if (is_off_walkway) {
        move_result = moveIntoAir(NE_16_STROLL_INTO_AIR, prev_hex, this_hex);
    } else {
        move_result = tile2TileNE(o_walkway_tiles, this_hex, prev_hex);
    }
    return move_result;
}

/*  curve_up__curve_up.png   like a flower */
function neCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NW_to_NN = prev_tilt_up == TILT_NW && new_tilt_up == TILT_NN;
    if (NW_to_NN && lows_and_highs) {
        ee("FLOWER CLOCK ne");
        return true;
    }
    return false;
}

function neCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SS_to_SE = prev_tilt_up == TILT_SS && new_tilt_up == TILT_SE;
    if (SS_to_SE && lows_and_highs) {
        ee("FLOWER COUNT ne");
        return true;
    }
    return false;
}

/*  curve_down__curve_down.png  like a cap */
function neCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const SE_to_SS = prev_tilt_up == TILT_SE && new_tilt_up == TILT_SS;
    if (SE_to_SS && lows_and_highs) {
        ee("hat CLOCK ne");
        return true;
    }
    return false;
}

function neCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data) {
    const NN_to_NW = prev_tilt_up == TILT_NN && new_tilt_up == TILT_NW;
    if (NN_to_NW && lows_and_highs) {
        ee("hat COUNT ne");
        return true;
    }
    return false;
}

function neFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NONE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NONE;
    if (NONE_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function neFlatToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const NONE_to_NE = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_NE;
    if (NONE_to_NE && low_to_low) {
        return true;
    }
    return false;
}

function neUpToFlat(prev_tilt_up, new_tilt_up, high_to_high) {
    const NE_to_NONE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NONE;
    if (NE_to_NONE && high_to_high) {
        return true;
    }
    return false;
}

function neDownToFlat(prev_tilt_up, new_tilt_up, low_to_low) {
    const SW_to_NONE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NONE;
    if (SW_to_NONE && low_to_low) {
        return true;
    }
    return false;
}

function neFlatToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NONE_to_SW = prev_tilt_up == TILT_NONE && new_tilt_up == TILT_SW;
    if (NONE_to_SW && high_to_high) {
        return true;
    }
    return false;
}

function neUpToUp(prev_tilt_up, new_tilt_up, high_to_low) {
    const NE_to_NE = prev_tilt_up == TILT_NE && new_tilt_up == TILT_NE;
    if (NE_to_NE && high_to_low) {
        return true;
    }
    return false;
}

function neDownToDown(prev_tilt_up, new_tilt_up, low_to_high) {
    const SW_to_SW = prev_tilt_up == TILT_SW && new_tilt_up == TILT_SW;
    if (SW_to_SW && low_to_high) {
        return true;
    }
    return false;
}

function neUpToDown(prev_tilt_up, new_tilt_up, high_to_high) {
    const NE_to_SW = prev_tilt_up == TILT_NE && new_tilt_up == TILT_SW;
    if (NE_to_SW && high_to_high) {
        return true;
    }
    return false;
}

function neDownToUp(prev_tilt_up, new_tilt_up, low_to_low) {
    const SW_to_NE = prev_tilt_up == TILT_SW && new_tilt_up == TILT_NE;
    if (SW_to_NE && low_to_low) {
        return true;
    }
    return false;
}

export { leaveTileNE };
