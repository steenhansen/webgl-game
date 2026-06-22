import { ee, tt, EE, TT } from "../../misc/console-short.js";
import { moveDescendOneStep, moveOntoTrampoline, moveIntoAir, undefTileDebugInfo, moveAllow, moveBlock } from "../ground-tiles.js";
import {
    PRINT_ALLOWED,
    RUN_OR_TEST,
    MV_FALL_JUMP_STRAIGHT,
    MV_TILE_NEW,
    MV_TILE_SAME,
    MV_FENCE_BLOCKED,
    TESTINs_PRINT,
    FENCE_SW,
    TILT_SS,
    TILT_NONE,
    TILT_NN,
    TILT_NE,
    TILT_SE,
    TILT_SW,
    TILT_NW
} from "../../values/the-constants.js";
import { stripYindex, tileData, offWalkway, hitFence } from "../hex-routines.js";

import {
    NE_AIRBORNE,
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
    NE_14_BLOCKED
} from "./ne-constants.js";

function moveToNe(the_objects, prev_hex, this_hex, is_a_trampoline) {
    let { o_walkway_tiles, o_walkway_columns, o_fence_walls, o_fence_columns } = the_objects;
    const { prev_new_data, data } = tileData(o_walkway_tiles, prev_hex, this_hex);
    const { prev_tilt_up, new_tilt_up } = prev_new_data;
    const local_data = { prev_tilt_up, new_tilt_up, prev_hex, this_hex };
    if (hitFence(o_fence_walls, o_fence_columns, prev_hex, this_hex)) {
        const is_blocked = moveBlock(local_data, NE_14_BLOCKED);
        return is_blocked;
    }

    if (offWalkway(o_walkway_columns, this_hex)) {
        if (is_a_trampoline) {
            return moveOntoTrampoline(local_data, NE_AIRBORNE);
        } else {
            return moveIntoAir(local_data, NE_AIRBORNE);
        }
    }
    const { low_to_low, high_to_high, lows_and_highs, high_to_low, low_to_high } = data;
    if (neCurveInClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NE_1_UP_UP_CLOCK); //      ⭮
    } else if (neCurveInCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NE_2_UP_UP_COUNTER); //      ⭯
    } else if (neCurveOutClock(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NE_3_DOWN_DOWN_CLOCK); //  ⭮
    } else if (neCurveOutCounter(prev_tilt_up, new_tilt_up, lows_and_highs, data)) {
        return moveAllow(local_data, NE_4_DOWN_DOWN_COUNTER); //  ⭯
    } else if (neFlatToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NE_5_FLAT__FLAT); // - -
    } else if (neFlatToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NE_6_FLAT__UP); //   _⭜
    } else if (neUpToFlat(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NE_7_UP__FLAT); //   ↗¯¯
    } else if (neDownToFlat(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NE_8_DOWN__FLAT); // ↘__
    } else if (neFlatToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NE_9_FLAT__DOWN); // ¯⭝
    } else if (neUpToUp(prev_tilt_up, new_tilt_up, high_to_low)) {
        return moveAllow(local_data, NE_10_UP__UP); //     ↗↗
    } else if (neDownToDown(prev_tilt_up, new_tilt_up, low_to_high)) {
        return moveAllow(local_data, NE_11_DOWN__DOWN); // ↘↘
    } else if (neUpToDown(prev_tilt_up, new_tilt_up, high_to_high)) {
        return moveAllow(local_data, NE_12_UP__DOWN); //  ↗↘
    } else if (neDownToUp(prev_tilt_up, new_tilt_up, low_to_low)) {
        return moveAllow(local_data, NE_13_DOWN__UP); //  ↘↗
    } else if (prev_hex == this_hex) {
        return MV_TILE_SAME;
    }
    // this only steps down from HEIGHT_Y___11 to HEIGHT_Y___10
    if (prev_new_data.new_high_y <= prev_new_data.prev_low_y) {
        return moveDescendOneStep(local_data, NE_AIRBORNE);
    }
    return moveBlock(local_data, NE_14_BLOCKED); // ¯¯↗
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

export { moveToNe };
